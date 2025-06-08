import { FishbowlActiveTracker } from "../../../backend";

export interface FishbowlCycleTime {
  timeFraction: number;
  timeRemaining: number;
}

export function timer(cycle: FishbowlActiveTracker): FishbowlCycleTime {
  const currentTime = new Date().valueOf();
  if (cycle.state !== "running") {
    return {
      timeFraction: cycle.seedTime / cycle.countdownTimer,
      timeRemaining: Math.round((cycle.countdownTimer - cycle.seedTime) / 1000)
    };
  }

  const normalizedTime = currentTime - cycle.startTime + cycle.seedTime;

  return {
    timeFraction: normalizedTime / cycle.countdownTimer,
    timeRemaining: Math.round((cycle.countdownTimer - normalizedTime) / 1000)
  };
}
