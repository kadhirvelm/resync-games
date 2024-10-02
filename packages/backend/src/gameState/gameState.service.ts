import { BadRequestException, Injectable } from "@nestjs/common";
import {
  AvailableGames,
  CreateGame,
  GameState,
  GetGameState,
  UpdateGame,
  UpdateGameResponse
} from "@resync-games/api";
import { GameStateSocketGateway } from "./gameState.socket";
import cuid from "@bugsnag/cuid";
import { PrismaService } from "src/games/tiles-tbd/database/prisma.service";

@Injectable()
export class GameStateService {
  public constructor(
    private prismaService: PrismaService,
    private socketGateway: GameStateSocketGateway
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
    return {
      games: []
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
    // TODO: implement updating the actual game state
    const newGameState = {} as GameState;

    // TODO: implement a debounced mechanism to update the stored game state in the database

    this.socketGateway.updateGameState(newGameState, updateGameRequest.gameId);

    return {
      didAcceptChange: false,
      newGameState
    };
  };
}
