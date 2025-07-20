import { Service, ServiceDefinition } from "../../genericTypes/service";
import { GameId, GameType } from "../gameState";
import { Player } from "../user";

export interface SnapshotState {
  description: string;
  gameStateSlice: object;
  gameType: GameType;
  localStateSlice: object;
  playerSlice: object;
  snapshotId: SnapshotId;
  timestamp: string;
}

export type SnapshotStateDisplay = Pick<
  SnapshotState,
  "description" | "gameType" | "snapshotId" | "timestamp"
>;

export interface InitiateGameFromSnapshotResponse {
  gameId: GameId;
  gameStateSlice: object;
  localStateSlice: object;
  playerSlice: object;
  players: Player[];
}

export interface UpdateSnapshotStatRequest {
  gameId?: GameId;
  newSnapshotState: Omit<SnapshotState, "snapshotId" | "timestamp">;
  snapshotId: SnapshotId;
}

export interface ResetGameToSnapshotRequest {
  gameId: GameId;
}

export interface ResetGameToSnapshotResponse {
  gameId: GameId;
  gameStateSlice: object;
  localStateSlice: object;
  playerSlice: object;
}

export interface DeleteSnapshotStateRequest {
  snapshotId: SnapshotId;
}

export type SnapshotId = string & { __brand: "snapshot-id" };

export interface SnapshotStateApi extends Service {
  deleteSnapshotState: {
    payload: DeleteSnapshotStateRequest;
    response: Record<string, never>;
  };
  getSnapshotStates: {
    payload: Record<string, never>;
    response: {
      snapshotStates: SnapshotStateDisplay[];
    };
  };
  initiateGameFromSnapshot: {
    payload: SnapshotStateDisplay;
    response: InitiateGameFromSnapshotResponse;
  };
  resetGameToSnapshot: {
    payload: ResetGameToSnapshotRequest;
    response: ResetGameToSnapshotResponse;
  };
  snapshotState: {
    payload: Omit<SnapshotState, "snapshotId" | "timestamp">;
    response: { snapshotId: SnapshotId };
  };
  updateSnapshotState: {
    payload: UpdateSnapshotStatRequest;
    response: { snapshotId: SnapshotId };
  };
}

export const SnapshotStateServiceDefinition: ServiceDefinition<SnapshotStateApi> =
  {
    controller: "snapshot-state",
    endpoints: {
      deleteSnapshotState: "delete-snapshot-state",
      getSnapshotStates: "get-snapshot-states",
      initiateGameFromSnapshot: "initiate-game-from-snapshot",
      resetGameToSnapshot: "reset-game-to-snapshot",
      snapshotState: "snapshot-state",
      updateSnapshotState: "update-snapshot-state"
    }
  };
