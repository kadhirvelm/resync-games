import { useEffect, useState } from "react";
import { FishbowlActiveTracker } from "../../../../backend";
import { FishbowlCycleTime, timer } from "../timer";

export function useTimer(
  cycle: FishbowlActiveTracker | undefined
): FishbowlCycleTime {
  const [_, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (cycle === undefined) {
    return {
      timeFraction: 0
    };
  }

  return timer(cycle);
}
