import { BadRequestException, Injectable } from "@nestjs/common";
import { GameId, GameStateAndInfo, GameType } from "@resync-games/api";
import * as _ from "lodash";
import { ResyncGamesPrismaService } from "../../database/resyncGamesPrisma.service";
import { GameStateSocketGateway } from "../gameState.socket";
import {
  BACKEND_GAME_REGISTRY,
  AvailableGameType,
  BackendRegisteredGame,
  StateReconcilerMethod
} from "@resync-games/games/backendRegistry";
import { reconcileStates, TimestampedState } from "./reconcileStates";

@Injectable()
export class GamesInFlightService {
  private gamesInFlightCache: Map<GameId, GameStateAndInfo> = new Map();

  public constructor(
    private prismaService: ResyncGamesPrismaService,
    private socketGateway: GameStateSocketGateway
  ) {}

  public getInFlightGame = async (
    gameId: GameId
  ): Promise<GameStateAndInfo> => {
    const maybeGame = this.gamesInFlightCache.get(gameId);
    if (maybeGame != null) {
      return maybeGame;
    }

    const accordingGame = await this.prismaService.client.gameState.findFirst({
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        gameId: gameId
      }
    });

    if (accordingGame == null) {
      throw new BadRequestException(`Unable to find game with id: ${gameId}`);
    }

    const convertedGame = this.prismaService.converterService.convertGameState(
      accordingGame,
      accordingGame.PlayersInGame.map((p) =>
        this.prismaService.converterService.convertPlayer(p.player)
      )
    );
    this.gamesInFlightCache.set(gameId, convertedGame);

    return convertedGame;
  };

  public updateInFlightGame = async (
    previousGameState: GameStateAndInfo,
    nextGameState: GameStateAndInfo
  ) => {
    const reconcilerMethod = this.getGameStateReconcilerMethod(
      nextGameState.gameType
    );
    const { didAcceptChange, newState } = reconcileStates(
      previousGameState.gameState as TimestampedState,
      nextGameState.gameState as TimestampedState,
      reconcilerMethod
    );

    if (!didAcceptChange) {
      return { didAcceptChange: false, newGameState: previousGameState };
    }

    const newGameState: GameStateAndInfo = {
      ...previousGameState,
      gameState: newState
    };

    this.gamesInFlightCache.set(newGameState.gameId, newGameState);
    this.socketGateway.updateGameState(newGameState, newGameState.gameId);

    this.debouncedUpdateInFlightGame(newGameState);

    return { didAcceptChange: true, newGameState };
  };

  private getGameStateReconcilerMethod = (
    gameType: GameType
  ): StateReconcilerMethod => {
    const maybeGame: BackendRegisteredGame | undefined =
      BACKEND_GAME_REGISTRY[gameType as AvailableGameType];
    return maybeGame?.stateReconcilerMethod ?? "top-level";
  };

  private updateInFlightGameInDb = async (newGameState: GameStateAndInfo) => {
    await this.prismaService.client.gameState.update({
      data: {
        gameState: newGameState.gameState
      },
      where: {
        gameId: newGameState.gameId
      }
    });
  };

  private debouncedUpdateInFlightGame = _.debounce(
    this.updateInFlightGameInDb,
    1000
  );
}
