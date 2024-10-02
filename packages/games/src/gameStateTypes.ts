import { ImplementedGameType } from ".";

export type GameId = string & { __brand: "game-id" };
export type GameType = ImplementedGameType;
export type PlayerId = string & { __brand: "player-id" };

export type CurrentGameState = "waiting" | "playing" | "finished";

export interface Player {
  displayName: string;
  playerId: PlayerId;
}

export interface GameState {
  currentGameState: CurrentGameState;
  gameConfiguration: object;
  gameId: GameId;
  gameState: object;
  gameType: GameType;
  players: Player[];
  version: string;
}
