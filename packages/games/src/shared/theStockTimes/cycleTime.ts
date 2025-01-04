import { StockTimesCycle } from "../../backend/theStockTimes/theStockTimes";

export type CurentCyle = "day" | "night";

export interface CycleTime {
  currentCycle: CurentCyle;
  /**
   * The current time in milliseconds since the game started. Used for a seed value when pausing the game.
   */
  currentTime: number;
  day: number;
  time: number;
  timeFraction: number;
}

export function cycleTime(cycle: StockTimesCycle, value?: number): CycleTime {
  const initialTime =
    value === undefined ? new Date().valueOf() : new Date(value).valueOf();
  const currentTime =
    initialTime - new Date(cycle.startTime).valueOf() + cycle.seedTime;

  const totalTimePerDay = cycle.dayTime + cycle.nightTime;

  const day = Math.floor(currentTime / totalTimePerDay) + 1;
  const time = currentTime % totalTimePerDay;
  const timeFraction = time / totalTimePerDay;
  const currentCycle: "day" | "night" =
    time < cycle.nightTime ? "night" : "day";

  return {
    currentCycle,
    currentTime,
    day,
    time,
    timeFraction
  };
}
