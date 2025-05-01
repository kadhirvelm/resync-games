import { CycleTime, cycleTime } from "@/imports/games-shared";
import { StockTimesCycle } from "../../../backend/theStockTimes/theStockTimes";
import { useEffect, useState } from "react";

export function useCycleTime(cycle: StockTimesCycle | undefined): CycleTime {
  const [_, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (cycle === undefined) {
    return {
      currentCycle: "day",
      currentTime: 0,
      day: 0,
      time: 0,
      timeFraction: 0
    };
  }

  return cycleTime(cycle);
}
