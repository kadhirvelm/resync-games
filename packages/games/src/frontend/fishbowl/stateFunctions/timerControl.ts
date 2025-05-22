import { FishbowlActiveTracker } from "../../../backend";

export function running(timer: FishbowlActiveTracker): FishbowlActiveTracker {
  return {
    ...timer,
    lastUpdatedAt: new Date().toISOString(),
    startTime: new Date().valueOf(),
    state: "running"
  };
}

export function paused(timer: FishbowlActiveTracker): FishbowlActiveTracker {
  return {
    ...timer,
    lastUpdatedAt: new Date().toISOString(),
    seedTime: new Date().valueOf() - timer.startTime + timer.seedTime,
    state: "paused"
  };
}
