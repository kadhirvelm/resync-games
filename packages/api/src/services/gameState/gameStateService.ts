import { Service, ServiceDefinition } from "../../genericTypes/service";
import { PlayerId } from "../user";
import { GameId, GameType, GameStateAndInfo } from "./gameStateTypes";

export interface GetGameState {
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId; // TODO: should be in the header
}

export interface CreateGame {
  gameConfiguration: object;
  gameName: string;
  gameType: GameType;
  playerId: PlayerId; // TODO: should be in the header
  version: string;
}

export interface UpdateGame {
  gameId: GameId;
  lastUpdatedAt: string;
  newGameState: object;
  playerId: PlayerId; // TODO: should be in the header
  version: string;
}

export type AvailableGame = Pick<
  GameStateAndInfo,
  "gameId" | "gameType" | "players"
>;

export interface AvailableGames {
  games: AvailableGame[];
}

export interface UpdateGameResponse {
  didAcceptChange: boolean;
  newGameState: GameStateAndInfo;
}

export interface GameStateApi extends Service {
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
  updateGame: {
    payload: UpdateGame;
    response: UpdateGameResponse;
  };
}

// TODO: add endpoint for joining and leaving a game
export const GameStateServiceDefinition: ServiceDefinition<GameStateApi> = {
  controller: "game-state",
  endpoints: {
    createGame: "create-game",
    getAvailableGames: "get-available-games",
    getGameState: "get-game-state",
    updateGame: "update-game"
  }
};
