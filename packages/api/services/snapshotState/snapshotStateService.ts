import { Service, ServiceDefinition } from "../../genericTypes/service";
import { GameType } from "../gameState";

export interface SnapshotState {
  description: string;
  gameStateSlice: object;
  gameType: GameType;
  localStateSlice: object;
  playerSlice: object;
  timestamp: string;
}

export type SnapshotStateDisplay = Pick<
  SnapshotState,
  "description" | "gameType" | "timestamp"
>;

export type SnapshotId = string & { __brand: "snapshot-id" };

export interface SnapshotStateApi extends Service {
  getSnapshotStates: {
    payload: Record<string, never>;
    response: {
      snapshotStates: SnapshotStateDisplay[];
    };
  };
  snapshotState: {
    payload: Omit<SnapshotState, "timestamp">;
    response: { snapshotId: SnapshotId };
  };
}

export const SnapshotStateServiceDefinition: ServiceDefinition<SnapshotStateApi> =
  {
    controller: "snapshot-state",
    endpoints: {
      getSnapshotStates: "get-snapshot-states",
      snapshotState: "snapshot-state"
    }
  };
