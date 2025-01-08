import { useEffect, useState } from "react";
import { OwnedStock } from "../../../backend/theStockTimes/theStockTimes";
import { selectPlayerPortfolio } from "../store/selectors";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { isAvailable, IsAvailable } from "./utils/isAvailable";

export function useStockLock(
  ownedStock: OwnedStock,
  stockSymbol: string
): IsAvailable {
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);
  const maybeStockLock = useGameStateSelector(selectPlayerPortfolio)
    ?.stockLocks[stockSymbol];

  const [_, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (cycle === undefined) {
    return {
      isAvailable: true,
      timeLeft: 0
    };
  }

  const availableLockedUntil = isAvailable(
    cycle,
    ownedStock.lockedUntil?.lockedAt,
    ownedStock.lockedUntil?.availabilityTime
  );

  const availableStockLock = isAvailable(
    cycle,
    maybeStockLock?.lockedAt,
    maybeStockLock?.availabilityTime
  );

  return {
    isAvailable:
      availableLockedUntil.isAvailable && availableStockLock.isAvailable,
    timeLeft: Math.max(
      availableLockedUntil.timeLeft,
      availableStockLock.timeLeft
    )
  };
}
