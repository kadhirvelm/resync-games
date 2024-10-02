import { Injectable } from "@nestjs/common";
import { GameId, GameState } from "@resync-games/api";
import * as _ from "lodash";
import { PrismaService } from "src/games/tiles-tbd/database/prisma.service";
import { GameStateSocketGateway } from "../gameState.socket";

@Injectable()
export class GamesInFlightService {
  private gamesInFlightCache: Map<GameId, GameState> = new Map();

  public constructor(
    private prismaService: PrismaService,
    private socketGateway: GameStateSocketGateway
  ) {}

  public getInFlightGame = async (gameId: GameId): Promise<GameState> => {
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

  public updateInFlightGame = async (newGameState: GameState) => {
    this.gamesInFlightCache.set(newGameState.gameId, newGameState);
    this.socketGateway.updateGameState(newGameState, newGameState.gameId);

    this.debouncedUpdateInFlightGame(newGameState);
  };

  private updateInFlightGameInDb = async (newGameState: GameState) => {
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
