import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { StockTimesCycle } from "../../backend/theStockTimes/theStockTimes";

export interface IsAvailable {
  isAvailable: boolean;
  timeLeft: number;
}

export function isAvailableAgainstClock(
  cycle: StockTimesCycle,
  usedAt: number | undefined,
  availableTime: number | undefined
): IsAvailable {
  const { currentTime } = cycleTime(cycle);

  const availableOn = (usedAt ?? 0) + (availableTime ?? 0);

  const isAvailable = availableOn < currentTime;
  const timeLeft = (() => {
    if (isAvailable) {
      return 0;
    }

    const timePassed = currentTime - (usedAt ?? 0);
    const percentTime = timePassed / (availableTime ?? 1);

    return 100 * percentTime;
  })();

  return {
    isAvailable,
    timeLeft
  };
}
