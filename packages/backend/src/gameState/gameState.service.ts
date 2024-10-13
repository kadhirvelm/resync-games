import { BadRequestException, Injectable } from "@nestjs/common";
import {
  AvailableGames,
  CreateGame,
  GameStateAndInfo,
  GetGameState,
  UpdateGame,
  UpdateGameResponse
} from "@resync-games/api";
import { GameStatePrismaService } from "./database/gameStatePrisma.service";
import { GamesInFlightService } from "./utils/gamesInFlight.service";
import {
  BACKEND_GAME_REGISTRY,
  AvailableGameType
} from "@resync-games/games/backendRegistry";
import { IGameServer } from "@resync-games/games/base";

@Injectable()
export class GameStateService {
  public constructor(
    private prismaService: GameStatePrismaService,
    private gamesInFlightService: GamesInFlightService
  ) {}

  public createGame = async (
    createGameRequest: CreateGame
  ): Promise<GameStateAndInfo> => {
    // The game needs to have an associated implementation.
    const backend: IGameServer | undefined =
      BACKEND_GAME_REGISTRY[createGameRequest.gameType as AvailableGameType]
        ?.gameServer;
    if (backend === undefined) {
      throw new BadRequestException(
        `The game type '${createGameRequest.gameType}' is not implemented. Available games: [${Object.keys(BACKEND_GAME_REGISTRY).join(", ")}]`
      );
    }

    // Check if the player exists in the database and create one with a dummy name for now if not.
    await this.prismaService.client.player.upsert({
      create: {
        displayName: "Anonymous",
        playerId: createGameRequest.playerId
      },
      update: {
        playerId: createGameRequest.playerId
      },
      where: {
        playerId: createGameRequest.playerId
      }
    });

    const { gameState, version } = await backend.createGame(createGameRequest);

    const requestedGame = await this.prismaService.client.gameState.create({
      data: {
        PlayersInGame: {
          create: {
            playerId: createGameRequest.playerId
          }
        },
        currentGameState: "waiting",
        gameConfiguration: createGameRequest.gameConfiguration,
        // TODO: call on the abstraction to create the default game state for the game here
        gameState,
        gameType: createGameRequest.gameType,
        // TODO: call on the abstraction to get the current version
        version
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
  ): Promise<GameStateAndInfo> => {
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

    const nextGameState: GameStateAndInfo = {
      ...currentGameState,
      gameState: updateGameRequest.newGameState,
      lastUpdatedAt: new Date().toISOString()
    };

    const { didAcceptChange, newGameState } =
      await this.gamesInFlightService.updateInFlightGame(
        currentGameState,
        nextGameState
      );

    return {
      didAcceptChange,
      newGameState
    };
  };
}
