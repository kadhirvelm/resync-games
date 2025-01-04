import { useEffect, useState } from "react";
import { StockTimesPlayer } from "../../../backend/theStockTimes/theStockTimes";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { selectPlayerPortfolio } from "../store/selectors";
import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";

export function useStorePower(
  storePower: keyof StockTimesPlayer["storePowers"]
) {
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);

  const [_, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (playerPortfolio === undefined || cycle === undefined) {
    return {
      isAvailable: false,
      timeLeft: 0
    };
  }

  const accordingStorePower = playerPortfolio.storePowers[storePower];
  if (accordingStorePower === undefined) {
    return {
      isAvailable: false,
      timeLeft: 0
    };
  }

  const { currentTime } = cycleTime(cycle);

  const availableOn =
    (accordingStorePower.usedAt ?? 0) + (accordingStorePower.cooldownTime ?? 0);

  const isAvailable = availableOn < currentTime;
  const timeLeft = (() => {
    if (isAvailable) {
      return 0;
    }

    const timePassed = currentTime - (accordingStorePower.usedAt ?? 0);
    const percentTime = timePassed / (accordingStorePower.cooldownTime ?? 1);

    return 100 * percentTime;
  })();

  return {
    isAvailable,
    timeLeft
  };
}
