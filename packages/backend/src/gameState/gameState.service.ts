import { UserService } from "@/user/user.service";
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
  UpdateGameConfiguration,
  UpdateGameResponse,
  UpdatePlayerInGame
} from "@resync-games/api";
import _ from "lodash";
import { ResyncGamesPrismaService } from "../database/resyncGamesPrisma.service";
import { GameRegistryService } from "./utils/gameRegistry.service";
import { GamesInFlightService } from "./utils/gamesInFlight.service";

@Injectable()
export class GameStateService {
  public constructor(
    private prismaService: ResyncGamesPrismaService,
    private gamesInFlightService: GamesInFlightService,
    private userService: UserService,
    private gameRegistryService: GameRegistryService
  ) {}

  public changeGameState = async (
    changeGameState: ChangeGameState
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
        gameId: changeGameState.gameId,
        gameType: changeGameState.gameType
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    const backend = this.gameRegistryService.getGameRegistry(
      changeGameState.gameType
    );
    const currentGameState =
      this.prismaService.converterService.convertGameState(
        requestedGame,
        requestedGame.PlayersInGame.map((p) => p.player),
        requestedGame.PlayersInGame
      );
    const canChangeToStateObject = _.pick(currentGameState, [
      "gameState",
      "players",
      "currentGameState",
      "gameConfiguration"
    ]);

    const canChangeToState = (await backend.canChangeToState?.(
      canChangeToStateObject,
      changeGameState.currentGameState
    )) ?? { canChange: true };

    if (!canChangeToState.canChange) {
      throw new BadRequestException(canChangeToState.reason);
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
      newGameStateRaw.PlayersInGame.map((p) => p.player),
      newGameStateRaw.PlayersInGame
    );

    await this.gamesInFlightService.updateGameInfo(newGameState);

    const maybeUpdatedGameState = await backend.onChangeState?.(
      canChangeToStateObject,
      changeGameState.currentGameState
    );
    if (maybeUpdatedGameState != null) {
      await this.gamesInFlightService.setGameState(
        changeGameState.gameId,
        maybeUpdatedGameState
      );
    }

    return newGameState;
  };

  public createGame = async (
    createGameRequest: CreateGame
  ): Promise<GameStateAndInfo> => {
    const backend = this.gameRegistryService.getGameRegistry(
      createGameRequest.gameType
    );

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
        gameState,
        gameType: createGameRequest.gameType,
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
      requestedGame.PlayersInGame.map((p) => p.player),
      requestedGame.PlayersInGame
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
      games: allGames.map((game) =>
        this.prismaService.converterService.convertGameState(
          game,
          game.PlayersInGame.map((p) => p.player),
          game.PlayersInGame
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
      allPlayers,
      requestedGame.PlayersInGame
    );
  };

  public joinGame = async (
    joinGameRequest: JoinGame
  ): Promise<GameStateAndInfo> => {
    const player = await this.userService.getUser(joinGameRequest.playerId);

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
        requestedGame.PlayersInGame.map((p) => p.player),
        requestedGame.PlayersInGame
      );
    }

    const backend = this.gameRegistryService.getGameRegistry(
      joinGameRequest.gameType
    );
    const updatedGameState =
      (await backend.onPlayerJoin?.(
        (requestedGame.gameState ?? {}) as object,
        requestedGame.gameConfiguration as object,
        player
      )) ??
      requestedGame.gameState ??
      {};

    const newGameStateRaw = await this.prismaService.client.gameState.update({
      data: {
        PlayersInGame: {
          create: {
            playerId: joinGameRequest.playerId
          }
        },
        gameState: updatedGameState
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
      newGameStateRaw.PlayersInGame.map((p) => p.player),
      newGameStateRaw.PlayersInGame
    );

    await this.gamesInFlightService.updateGameInfo(newGameState);

    return newGameState;
  };

  public leaveGame = async (leaveGame: LeaveGame) => {
    const player = await this.userService.getUser(leaveGame.playerId);

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

    const backend = this.gameRegistryService.getGameRegistry(
      leaveGame.gameType
    );
    const updatedGameState =
      (await backend.onPlayerLeave?.(
        (requestedGame.gameState ?? {}) as object,
        requestedGame.gameConfiguration as object,
        player
      )) ??
      requestedGame.gameState ??
      {};

    const newGameStateRaw = await this.prismaService.client.gameState.update({
      data: {
        PlayersInGame: {
          deleteMany: {
            gameId: leaveGame.gameId,
            playerId: leaveGame.playerId
          }
        },
        gameState: updatedGameState
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
      newGameStateRaw.PlayersInGame.map((p) => p.player),
      newGameStateRaw.PlayersInGame
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

  public updateGameConfiguration = async (
    updateGameConfiguration: UpdateGameConfiguration
  ) => {
    const currentGameState = await this.gamesInFlightService.getInFlightGame(
      updateGameConfiguration.gameId
    );

    if (currentGameState.currentGameState !== "waiting") {
      throw new BadRequestException(
        "Cannot update game configuration while the game is in progress."
      );
    }

    const currentDate = new Date(currentGameState.lastUpdatedAt);
    const updatedAtDate = new Date(updateGameConfiguration.lastUpdatedAt);
    if (currentDate.valueOf() !== updatedAtDate.valueOf()) {
      throw new BadRequestException(
        "The game has been updated since you last checked. Please refresh and try again."
      );
    }

    const nextGameState: GameStateAndInfo = {
      ...currentGameState,
      gameConfiguration: updateGameConfiguration.gameConfiguration,
      lastUpdatedAt: new Date().toISOString()
    };

    const backend = this.gameRegistryService.getGameRegistry(
      updateGameConfiguration.gameType
    );
    const maybeNewGameState = await backend.onChangeConfiguration?.(
      nextGameState.gameState,
      nextGameState.gameConfiguration
    );
    if (maybeNewGameState != null) {
      await this.gamesInFlightService.setGameState(
        nextGameState.gameId,
        maybeNewGameState
      );
    }

    await this.gamesInFlightService.updateGameInfo(nextGameState);

    await this.prismaService.client.gameState.update({
      data: {
        gameConfiguration: updateGameConfiguration.gameConfiguration
      },
      where: {
        gameId: updateGameConfiguration.gameId
      }
    });

    return nextGameState;
  };

  public updatePlayerInGame = async (
    updatePlayerInGame: UpdatePlayerInGame
  ) => {
    const requestedGame = await this.prismaService.client.gameState.findFirst({
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        gameId: updatePlayerInGame.gameId
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    const playerInGame = requestedGame.PlayersInGame.find(
      (p) => p.playerId === updatePlayerInGame.playerId
    );
    if (playerInGame == null) {
      throw new BadRequestException(
        "The requested player is not in the game. Please check your request and try again."
      );
    }

    if (updatePlayerInGame.displayName !== undefined) {
      await this.userService.update({
        displayName: updatePlayerInGame.displayName,
        playerId: updatePlayerInGame.playerId
      });
    }

    await this.prismaService.client.playersInGame.update({
      data: {
        team: updatePlayerInGame.team
      },
      where: {
        gameId_playerId: {
          gameId: updatePlayerInGame.gameId,
          playerId: updatePlayerInGame.playerId
        }
      }
    });

    const newGameStateRaw = await this.prismaService.client.gameState.findFirst(
      {
        include: {
          PlayersInGame: {
            include: {
              player: true
            }
          }
        },
        where: {
          gameId: updatePlayerInGame.gameId
        }
      }
    );
    if (newGameStateRaw == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    const newGameState = this.prismaService.converterService.convertGameState(
      newGameStateRaw,
      newGameStateRaw.PlayersInGame.map((p) => p.player),
      newGameStateRaw.PlayersInGame
    );

    await this.gamesInFlightService.updateGameInfo(newGameState);

    return newGameState;
  };
}
