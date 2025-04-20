import { WithTimestamp } from "../../genericTypes";
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
  gameType: GameType;
  playerId: PlayerId;
  version: string;
}

export interface UpdateGame extends WithTimestamp {
  gameId: GameId;
  newGameState: object;
  playerId?: PlayerId;
  version: string;
}

export interface ChangeGameState {
  currentGameState: CurrentGameState;
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId;
}

export interface JoinGameWithCode {
  inviteCode: string;
  playerId: PlayerId;
}

export interface JoinGameWithId {
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId;
}

export interface LeaveGame {
  gameId: GameId;
  gameType: GameType;
  kick?: boolean;
  playerId: PlayerId;
}

export interface UpdatePlayerInGame {
  displayName?: string;
  gameId: GameId;
  playerId: PlayerId;
  team?: number;
}

export interface UpdateGameConfiguration<GameConfiguration = object>
  extends WithTimestamp {
  gameConfiguration: GameConfiguration;
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId;
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
  getGameState: {
    payload: GetGameState;
    response: GameStateAndInfo;
  };
  joinGame: {
    payload: JoinGameWithCode;
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
  updateGameConfiguration: {
    payload: UpdateGameConfiguration;
    response: GameStateAndInfo;
  };
  updatePlayerInGame: {
    payload: UpdatePlayerInGame;
    response: GameStateAndInfo;
  };
}

export const GameStateServiceDefinition: ServiceDefinition<GameStateApi> = {
  controller: "game-state",
  endpoints: {
    changeGameState: "change-game-state",
    createGame: "create-game",
    getGameState: "get-game-state",
    joinGame: "join-game",
    leaveGame: "leave-game",
    updateGame: "update-game",
    updateGameConfiguration: "update-game-configuration",
    updatePlayerInGame: "update-player-in-game"
  }
};
