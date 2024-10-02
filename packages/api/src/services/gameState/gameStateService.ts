import { Service, ServiceDefinition } from "../../genericTypes/service";
import { GameId, GameType, PlayerId, GameState } from "@tiles-tbd/games";

export interface GetGameStateRequest {
  gameId: GameId;
  gameType: GameType;
  playerId: PlayerId; // TODO: should be in the header
}

export interface CreateGameRequest {
  gameConfiguration: object;
  gameName: string;
  gameType: GameType;
  playerId: PlayerId; // TODO: should be in the header
  version: string;
}

export interface UpdateGame {
  gameId: GameId;
  newGameState: Partial<object>;
  playerId: PlayerId; // TODO: should be in the header
  timestamp: string;
  version: string;
}

export type AvailableGame = Pick<
  GameState,
  "gameId" | "gameType" | "playerIds"
>[];

export interface AvailableGames {
  games: AvailableGame;
}

export interface UpdateGameResponse {
  didAcceptChange: boolean;
  newGameState: GameState;
}

export interface GameStateApi extends Service {
  createGame: {
    payload: CreateGameRequest;
    response: GameState;
  };
  getAvailableGames: {
    payload: Record<string, never>;
    response: AvailableGames;
  };
  getGameState: {
    payload: GetGameStateRequest;
    response: GameState;
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
