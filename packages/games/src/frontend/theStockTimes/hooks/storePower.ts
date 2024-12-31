import { useEffect, useState } from "react";
import { StockTimesPlayer } from "../../../backend/theStockTimes/theStockTimes";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { selectPlayerPortfolio } from "../store/selectors";

export function useStorePower(
  storePower: keyof StockTimesPlayer["storePowers"]
) {
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);

  const [_, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (playerPortfolio === undefined) {
    return {
      isAvailable: false,
      timeLeft: 0
    };
  }

  const accordingStorePower = playerPortfolio.storePowers[storePower];

  const unlocksAt =
    accordingStorePower.unlocksAt !== undefined
      ? new Date(accordingStorePower.unlocksAt)
      : new Date();
  const isAvailable = new Date().valueOf() >= unlocksAt.valueOf();

  const percentTimeLeft =
    Math.max(unlocksAt.valueOf() - new Date().valueOf(), 0) /
    (accordingStorePower.cooldownTime ?? 1);

  return {
    isAvailable,
    timeLeft: 100 - percentTimeLeft * 100
  };
}
