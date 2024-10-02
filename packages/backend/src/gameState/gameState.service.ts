import cuid from "@bugsnag/cuid";
import { BadRequestException, Injectable } from "@nestjs/common";
import {
  AvailableGames,
  CreateGame,
  GameState,
  GetGameState,
  UpdateGame,
  UpdateGameResponse
} from "@resync-games/api";
import { PrismaService } from "src/games/tiles-tbd/database/prisma.service";
import { GamesInFlightService } from "./utils/gamesInFlight.service";

@Injectable()
export class GameStateService {
  public constructor(
    private prismaService: PrismaService,
    private gamesInFlightService: GamesInFlightService
  ) {}

  public createGame = async (
    createGameRequest: CreateGame
  ): Promise<GameState> => {
    const newGameId = cuid();

    const requestedGame = await this.prismaService.client.gameState.create({
      data: {
        PlayersInGame: {
          create: {
            playerId: createGameRequest.playerId
          }
        },
        currentGameState: "waiting",
        gameConfiguration: createGameRequest.gameConfiguration,
        gameId: newGameId,
        // TODO: call on the abstraction to create the default game state for the game here
        gameState: {} as object,
        gameType: createGameRequest.gameType,
        // TODO: call on the abstraction to get the current version
        version: "1.0.0"
      },
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      }
    });

    return this.prismaService.converterService.convertGameState(
      requestedGame,
      requestedGame.PlayersInGame.map((p) => p.player)
    );
  };

  public getAvailableGames = async (): Promise<AvailableGames> => {
    const allGames = await this.prismaService.client.gameState.findMany({
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        currentGameState: "waiting"
      }
    });

    return {
      games: allGames.map((g) =>
        this.prismaService.converterService.convertGameState(
          g,
          g.PlayersInGame.map((p) => p.player)
        )
      )
    };
  };

  public getGameState = async (
    getGameStateRequest: GetGameState
  ): Promise<GameState> => {
    const requestedGame = await this.prismaService.client.gameState.findFirst({
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        PlayersInGame: {
          some: {
            playerId: getGameStateRequest.playerId
          }
        },
        gameId: getGameStateRequest.gameId,
        gameType: getGameStateRequest.gameType
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    return this.prismaService.converterService.convertGameState(
      requestedGame,
      requestedGame.PlayersInGame.map((p) => p.player)
    );
  };

  public updateGame = async (
    updateGameRequest: UpdateGame
  ): Promise<UpdateGameResponse> => {
    const currentGameState = await this.gamesInFlightService.getInFlightGame(
      updateGameRequest.gameId
    );

    // TODO: differentiate between outdated clients vs. outdated states for rejections
    if (
      currentGameState.lastUpdatedAt !== updateGameRequest.lastUpdateAt ||
      currentGameState.version !== updateGameRequest.version
    ) {
      return {
        didAcceptChange: false,
        newGameState: currentGameState
      };
    }

    const newGameState: GameState = {
      ...currentGameState,
      gameState: updateGameRequest.newGameState,
      lastUpdatedAt: new Date().toISOString()
    };
    this.gamesInFlightService.updateInFlightGame(newGameState);

    return {
      didAcceptChange: true,
      newGameState
    };
  };
}
