import { StockTimesCycle } from "../../backend/theStockTimes/theStockTimes";

export function cycleTime(cycle: StockTimesCycle) {
  const currentTime =
    new Date().valueOf() - new Date(cycle.startTime).valueOf();
  const totalTimePerDay = cycle.dayTime + cycle.nightTime;

  const day = Math.floor(currentTime / totalTimePerDay) + 1;
  const time = currentTime % totalTimePerDay;
  const timeFraction = time / totalTimePerDay;
  const currentCycle: "day" | "night" = time < cycle.dayTime ? "day" : "night";

  return {
    currentCycle,
    day,
    time,
    timeFraction
  };
}
