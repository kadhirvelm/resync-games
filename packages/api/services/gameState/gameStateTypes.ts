import { WithTimestamp } from "../../genericTypes";
import { SnapshotId } from "../snapshotState";
import { Player } from "../user";

export type GameId = string & { __brand: "game-id" };
export type GameType = string & { __brand: "game-type" }; // Equivalent of (typeof GAME_SLUGS)[number]

export type CurrentGameState = "waiting" | "playing" | "finished";

export interface PlayerInGame extends Player {
  connectionStatus?: "connected" | "disconnected";
  team: number; // 0 is undecided, 1 is team 1, 2 is team 2
}

export interface GameInfo<GameConfiguration = object> extends WithTimestamp {
  currentGameState: CurrentGameState;
  gameConfiguration: GameConfiguration;
  gameId: GameId;
  gameType: GameType;
  hasSnapshotState: boolean;
  inviteCode: string;
  players: PlayerInGame[];
  snapshotId?: SnapshotId;
  version: string;
}

export interface GameStateAndInfo<
  GameState = object,
  GameConfiguration = object
> extends GameInfo<GameConfiguration> {
  gameState: GameState;
}
