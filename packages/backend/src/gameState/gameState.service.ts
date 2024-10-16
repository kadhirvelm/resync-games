import { BadRequestException, Injectable } from "@nestjs/common";
import {
  AvailableGames,
  ChangeGameState,
  CreateGame,
  GameStateAndInfo,
  GetGameState,
  JoinGame,
  LeaveGame,
  UpdateGame,
  UpdateGameResponse
} from "@resync-games/api";
import { ResyncGamesPrismaService } from "../database/resyncGamesPrisma.service";
import { GamesInFlightService } from "./utils/gamesInFlight.service";
import {
  BACKEND_GAME_REGISTRY,
  AvailableGameType
} from "@resync-games/games/backendRegistry";
import { IGameServer } from "@resync-games/games/base";

@Injectable()
export class GameStateService {
  public constructor(
    private prismaService: ResyncGamesPrismaService,
    private gamesInFlightService: GamesInFlightService
  ) {}

  public changeGameState = async (
    changeGameState: ChangeGameState
  ): Promise<GameStateAndInfo> => {
    const requestedGame = await this.prismaService.client.gameState.findFirst({
      where: {
        gameId: changeGameState.gameId,
        gameType: changeGameState.gameType
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    const newGameStateRaw = await this.prismaService.client.gameState.update({
      data: {
        currentGameState: changeGameState.currentGameState
      },
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        gameId: changeGameState.gameId
      }
    });

    const newGameState = this.prismaService.converterService.convertGameState(
      newGameStateRaw,
      newGameStateRaw.PlayersInGame.map((p) => p.player)
    );

    await this.gamesInFlightService.updateGameInfo(newGameState);

    return newGameState;
  };

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
        gameId: getGameStateRequest.gameId,
        gameType: getGameStateRequest.gameType
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    const allPlayers = requestedGame.PlayersInGame.map((p) => p.player);

    const isPlayerInGame = requestedGame.PlayersInGame.some(
      (p) => p.playerId === getGameStateRequest.playerId
    );
    if (!isPlayerInGame) {
      return await this.joinGame({
        gameId: getGameStateRequest.gameId,
        gameType: getGameStateRequest.gameType,
        playerId: getGameStateRequest.playerId
      });
    }

    return this.prismaService.converterService.convertGameState(
      requestedGame,
      allPlayers
    );
  };

  public joinGame = async (
    joinGameRequest: JoinGame
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
        currentGameState: "waiting",
        gameId: joinGameRequest.gameId,
        gameType: joinGameRequest.gameType
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    const playerAlreadyInGame = requestedGame.PlayersInGame.some(
      (p) => p.playerId === joinGameRequest.playerId
    );
    if (playerAlreadyInGame) {
      return this.prismaService.converterService.convertGameState(
        requestedGame,
        requestedGame.PlayersInGame.map((p) => p.player)
      );
    }

    const newGameStateRaw = await this.prismaService.client.gameState.update({
      data: {
        PlayersInGame: {
          create: {
            playerId: joinGameRequest.playerId
          }
        }
      },
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        gameId: joinGameRequest.gameId
      }
    });

    const newGameState = this.prismaService.converterService.convertGameState(
      newGameStateRaw,
      newGameStateRaw.PlayersInGame.map((p) => p.player)
    );

    await this.gamesInFlightService.updateGameInfo(newGameState);

    return newGameState;
  };

  public leaveGame = async (leaveGame: LeaveGame) => {
    const requestedGame = await this.prismaService.client.gameState.findFirst({
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        gameId: leaveGame.gameId,
        gameType: leaveGame.gameType
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    const playerInGame = requestedGame.PlayersInGame.find(
      (p) => p.playerId === leaveGame.playerId
    );
    if (playerInGame == null) {
      throw new BadRequestException(
        "The requested player is not in the game. Please check your request and try again."
      );
    }

    const newGameStateRaw = await this.prismaService.client.gameState.update({
      data: {
        PlayersInGame: {
          deleteMany: {
            gameId: leaveGame.gameId,
            playerId: leaveGame.playerId
          }
        }
      },
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        gameId: leaveGame.gameId
      }
    });

    const newGameState = this.prismaService.converterService.convertGameState(
      newGameStateRaw,
      newGameStateRaw.PlayersInGame.map((p) => p.player)
    );

    await this.gamesInFlightService.updateGameInfo(newGameState);

    return newGameState;
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
