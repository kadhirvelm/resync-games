import { Service, ServiceDefinition } from "../../genericTypes/service";
import { PlayerId } from "../user";
import {
  GameId,
  GameType,
  GameStateAndInfo,
  CurrentGameState
} from "./gameStateTypes";

export interface GetGameState {
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId;
}

export interface CreateGame<GameConfiguration = object> {
  gameConfiguration: GameConfiguration;
  gameName: string;
  gameType: GameType;
  playerId: PlayerId;
  version: string;
}

export interface UpdateGame {
  gameId: GameId;
  lastUpdatedAt: string;
  newGameState: object;
  playerId?: PlayerId;
  version: string;
}

export type AvailableGame = Pick<
  GameStateAndInfo,
  "gameId" | "gameType" | "players"
>;

export interface AvailableGames {
  games: AvailableGame[];
}

export interface ChangeGameState {
  currentGameState: CurrentGameState;
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId;
}

export interface JoinGame {
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId;
}

export interface LeaveGame {
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId;
}

export interface UpdatePlayerInGame {
  displayName?: string;
  gameId: GameId;
  playerId: PlayerId;
  team?: number;
}

export interface UpdateGameResponse {
  didAcceptChange: boolean;
  newGameState: GameStateAndInfo;
}

export interface GameStateApi extends Service {
  changeGameState: {
    payload: ChangeGameState;
    response: GameStateAndInfo;
  };
  createGame: {
    payload: CreateGame;
    response: GameStateAndInfo;
  };
  getAvailableGames: {
    payload: Record<string, never>;
    response: AvailableGames;
  };
  getGameState: {
    payload: GetGameState;
    response: GameStateAndInfo;
  };
  joinGame: {
    payload: JoinGame;
    response: GameStateAndInfo;
  };
  leaveGame: {
    payload: LeaveGame;
    response: GameStateAndInfo;
  };
  updateGame: {
    payload: UpdateGame;
    response: UpdateGameResponse;
  };
  updatePlayerInGame: {
    payload: UpdatePlayerInGame;
    response: GameStateAndInfo;
  };
}

// TODO: add endpoint for joining and leaving a game
export const GameStateServiceDefinition: ServiceDefinition<GameStateApi> = {
  controller: "game-state",
  endpoints: {
    changeGameState: "change-game-state",
    createGame: "create-game",
    getAvailableGames: "get-available-games",
    getGameState: "get-game-state",
    joinGame: "join-game",
    leaveGame: "leave-game",
    updateGame: "update-game",
    updatePlayerInGame: "update-player-in-game"
  }
};
