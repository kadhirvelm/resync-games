export type GameId = string & { __brand: "game-id" };
export type GameType = string & { __brand: "game-type" };
export type PlayerId = string & { __brand: "player-id" };

export type CurrentGameState = "waiting" | "playing" | "finished";

export interface GameState {
  currentGameState: CurrentGameState;
  gameConfiguration: object;
  gameId: GameId;
  gameState: object;
  gameType: GameType;
  players: {
    [player: PlayerId]: Record<string, never>;
  };
  version: string;
}