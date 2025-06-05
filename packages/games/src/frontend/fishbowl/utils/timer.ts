import { FishbowlActiveTracker } from "../../../backend";

export interface FishbowlCycleTime {
  timeFraction: number;
}

export function timer(cycle: FishbowlActiveTracker): FishbowlCycleTime {
  const currentTime = new Date().valueOf();
  if (cycle.state !== "running") {
    return {
      timeFraction: cycle.seedTime / cycle.countdownTimer
    };
  }

  const normalizedTime = currentTime - cycle.startTime + cycle.seedTime;

  return {
    timeFraction: normalizedTime / cycle.countdownTimer
  };
}
