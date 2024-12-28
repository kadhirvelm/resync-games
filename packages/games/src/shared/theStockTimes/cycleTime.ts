import { StockTimesCycle } from "../../backend/theStockTimes/theStockTimes";

export type CurentCyle = "day" | "night";

export interface CycleTime {
  currentCycle: CurentCyle;
  day: number;
  time: number;
  timeFraction: number;
}

export function cycleTime(cycle: StockTimesCycle, value?: number): CycleTime {
  const currentTime =
    (value === undefined ? new Date().valueOf() : new Date(value).valueOf()) -
    new Date(cycle.startTime).valueOf();
  const totalTimePerDay = cycle.dayTime + cycle.nightTime;

  const day = Math.floor(currentTime / totalTimePerDay) + 1;
  const time = currentTime % totalTimePerDay;
  const timeFraction = time / totalTimePerDay;
  const currentCycle: "day" | "night" =
    time < cycle.nightTime ? "night" : "day";

  return {
    currentCycle,
    day,
    time,
    timeFraction
  };
}
