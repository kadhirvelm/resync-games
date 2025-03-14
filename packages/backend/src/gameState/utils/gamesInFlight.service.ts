import { BadRequestException, Injectable } from "@nestjs/common";
import {
  GameId,
  GameStateAndInfo,
  GameType,
  JoinGame,
  LeaveGame,
  TimestampedState
} from "@resync-games/api";
import * as _ from "lodash";
import { ResyncGamesPrismaService } from "../../database/resyncGamesPrisma.service";
import { GameStateSocketGateway } from "../gameState.socket";
import {
  BACKEND_GAME_REGISTRY,
  AvailableGameType,
  BackendRegisteredGame,
  StateReconcilerMethod
} from "@resync-games/games/backendRegistry";
import { reconcileStates } from "./reconcileStates";
import { UserService } from "@/user/user.service";
import { GameRegistryService } from "./gameRegistry.service";
import { LRUCache } from "lru-cache";

@Injectable()
export class GamesInFlightService {
  private gamesInFlightCache = new LRUCache<GameId, GameStateAndInfo>({
    max: 50
  });

  public constructor(
    private prismaService: ResyncGamesPrismaService,
    private socketGateway: GameStateSocketGateway,
    private userService: UserService,
    private gameRegistryService: GameRegistryService
  ) {
    this.socketGateway.setJoinGameCallback(this.joinGame);
    this.socketGateway.setLeaveGameCallback(this.leaveGame);
  }

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
      ),
      accordingGame.PlayersInGame
    );
    this.gamesInFlightCache.set(gameId, convertedGame);

    return convertedGame;
  };

  public joinGame = async (joinGame: JoinGame) => {
    const player = await this.userService.getUser(joinGame.playerId);

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
        gameId: joinGame.gameId,
        gameType: joinGame.gameType
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    let newGameStateRaw = null;

    const playerAlreadyInGame = requestedGame.PlayersInGame.some(
      (p) => p.playerId === joinGame.playerId
    );
    if (playerAlreadyInGame) {
      newGameStateRaw = await this.prismaService.client.gameState.update({
        data: {
          PlayersInGame: {
            update: {
              data: {
                connectionStatus: "connected"
              },
              where: {
                gameId_playerId: {
                  gameId: joinGame.gameId,
                  playerId: joinGame.playerId
                }
              }
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
          gameId: joinGame.gameId
        }
      });
    } else {
      const backend = this.gameRegistryService.getGameRegistry(
        joinGame.gameType
      );
      const updatedGameState =
        (await backend.onPlayerJoin?.(
          (requestedGame.gameState ?? {}) as object,
          requestedGame.gameConfiguration as object,
          player
        )) ??
        requestedGame.gameState ??
        {};

      newGameStateRaw = await this.prismaService.client.gameState.update({
        data: {
          PlayersInGame: {
            create: {
              playerId: joinGame.playerId
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
          gameId: joinGame.gameId
        }
      });
    }

    const newGameState = this.prismaService.converterService.convertGameState(
      newGameStateRaw,
      newGameStateRaw.PlayersInGame.map((p) => p.player),
      newGameStateRaw.PlayersInGame
    );
    await this.updateGameInfo(newGameState);

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

    let newGameStateRaw = null;

    if (leaveGame.kick) {
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

      newGameStateRaw = await this.prismaService.client.gameState.update({
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
    } else {
      newGameStateRaw = await this.prismaService.client.gameState.update({
        data: {
          PlayersInGame: {
            update: {
              data: {
                connectionStatus: "disconnected"
              },
              where: {
                gameId_playerId: {
                  gameId: leaveGame.gameId,
                  playerId: leaveGame.playerId
                }
              }
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
    }

    const newGameState = this.prismaService.converterService.convertGameState(
      newGameStateRaw,
      newGameStateRaw.PlayersInGame.map((p) => p.player),
      newGameStateRaw.PlayersInGame
    );
    await this.updateGameInfo(newGameState);

    return newGameState;
  };

  public updateGameInfo = async (newGameStateAndInfo: GameStateAndInfo) => {
    this.gamesInFlightCache.set(
      newGameStateAndInfo.gameId,
      newGameStateAndInfo
    );

    this.socketGateway.updateGameState(
      newGameStateAndInfo,
      newGameStateAndInfo.gameId
    );
  };

  public setGameState = async (gameId: GameId, gameState: object) => {
    const currentGameState = this.gamesInFlightCache.get(gameId);
    if (currentGameState == null) {
      throw new BadRequestException(`Unable to find game with id: ${gameId}`);
    }

    const newGameState: GameStateAndInfo = {
      ...currentGameState,
      gameState
    };

    this.gamesInFlightCache.set(newGameState.gameId, newGameState);
    await this.updateInFlightGameInDb(newGameState);

    this.socketGateway.updateGameState(newGameState, newGameState.gameId);
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
