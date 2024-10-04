import { Injectable } from "@nestjs/common";
import { GameId, GameStateAndInfo } from "@resync-games/api";
import * as _ from "lodash";
import { GameStatePrismaService } from "../database/gameStatePrisma.service";
import { GameStateSocketGateway } from "../gameState.socket";

@Injectable()
export class GamesInFlightService {
  private gamesInFlightCache: Map<GameId, GameStateAndInfo> = new Map();

  public constructor(
    private prismaService: GameStatePrismaService,
    private socketGateway: GameStateSocketGateway
  ) {}

  public getInFlightGame = async (
    gameId: GameId
  ): Promise<GameStateAndInfo> => {
    if (this.gamesInFlightCache.get(gameId) != null) {
      return this.gamesInFlightCache.get(gameId);
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

    const convertedGame = this.prismaService.converterService.convertGameState(
      accordingGame,
      accordingGame.PlayersInGame.map((p) =>
        this.prismaService.converterService.convertPlayer(p.player)
      )
    );
    this.gamesInFlightCache.set(gameId, convertedGame);

    return convertedGame;
  };

  public updateInFlightGame = async (newGameState: GameStateAndInfo) => {
    this.gamesInFlightCache.set(newGameState.gameId, newGameState);
    this.socketGateway.updateGameState(newGameState, newGameState.gameId);

    this.debouncedUpdateInFlightGame(newGameState);
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
