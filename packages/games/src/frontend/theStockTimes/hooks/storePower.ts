import { useEffect, useState } from "react";
import { StockTimesPlayer } from "../../../backend/theStockTimes/theStockTimes";
import { selectPlayerPortfolio } from "../store/selectors";
import { useStockTimesSelector } from "../store/theStockTimesRedux";
import { IsAvailable, isAvailable } from "./utils/isAvailable";

export function useStorePower(
  storePower: keyof StockTimesPlayer["storePowers"]
): IsAvailable {
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);

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

  return isAvailable(
    cycle,
    accordingStorePower.usedAt,
    accordingStorePower.cooldownTime
  );
}
