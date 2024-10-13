import { Player } from "../user";

export type GameId = string & { __brand: "game-id" };
export type GameType = string & { __brand: "game-type" }; // Equivalent of (typeof GAME_SLUGS)[number]

export type CurrentGameState = "waiting" | "playing" | "finished";

export interface GameInfo {
  currentGameState: CurrentGameState;
  gameConfiguration: object;
  gameId: GameId;
  gameType: GameType;
  lastUpdatedAt: string;
  players: Player[];
  version: string;
}

export interface GameStateAndInfo extends GameInfo {
  gameState: object;
}
