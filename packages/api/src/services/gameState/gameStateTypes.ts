import { WithTimestamp } from "../../genericTypes";
import { Player } from "../user";

export type GameId = string & { __brand: "game-id" };
export type GameType = string & { __brand: "game-type" }; // Equivalent of (typeof GAME_SLUGS)[number]

export type CurrentGameState = "waiting" | "playing" | "finished";

export interface PlayerInGame extends Player {
  connectionStatus?: "connected" | "disconnected";
  team?: number;
}

export interface GameInfo<GameConfiguration = object> extends WithTimestamp {
  currentGameState: CurrentGameState;
  gameConfiguration: GameConfiguration;
  gameId: GameId;
  gameName: string;
  gameType: GameType;
  players: PlayerInGame[];
  version: string;
}

export interface GameStateAndInfo<
  GameState = object,
  GameConfiguration = object
> extends GameInfo<GameConfiguration> {
  gameState: GameState;
}
