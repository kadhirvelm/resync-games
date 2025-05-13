import { FishbowlActiveTracker } from "../../../backend";

export interface FishbowlCycleTime {
  timeFraction: number;
}

export function timer(cycle: FishbowlActiveTracker): FishbowlCycleTime {
  const currentTime = new Date().valueOf();
  const normalizedTime = currentTime - cycle.startTime + cycle.seedTime;

  return {
    timeFraction: normalizedTime / cycle.countdownTimer
  };
}
