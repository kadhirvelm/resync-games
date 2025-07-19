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

export interface GetGlobalScreenUrl {
  inviteCode: string;
}

export interface GetGlobalScreenUrlResponse {
  gameId: GameId;
  gameType: GameType;
}

export interface JoinGameWithId {
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId;
}

export interface LeaveGame {
  gameId: GameId;
  gameType: GameType;
  hasExited?: boolean;
  kick?: boolean;
  playerId: PlayerId;
}

export interface UpdatePlayerInGame {
  avatarCollection: string;
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

export interface ShuffleTeams {
  gameId: GameId;
  gameType: GameType;
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
  getGlobalScreenUrl: {
    payload: GetGlobalScreenUrl;
    response: GetGlobalScreenUrlResponse;
  };
  joinGame: {
    payload: JoinGameWithCode;
    response: GameStateAndInfo;
  };
  leaveGame: {
    payload: LeaveGame;
    response: GameStateAndInfo;
  };
  shuffleTeams: {
    payload: ShuffleTeams;
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
    getGlobalScreenUrl: "get-global-screen-url",
    joinGame: "join-game",
    leaveGame: "leave-game",
    shuffleTeams: "shuffle-teams",
    updateGame: "update-game",
    updateGameConfiguration: "update-game-configuration",
    updatePlayerInGame: "update-player-in-game"
  }
};
