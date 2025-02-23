import { useEffect, useState } from "react";
import { OwnedStock } from "../../../backend/theStockTimes/theStockTimes";
import { selectPlayerPortfolio } from "../store/selectors";
import { useStockTimesSelector } from "../store/theStockTimesRedux";
import {
  isAvailableAgainstClock,
  IsAvailable
} from "../../../shared/theStockTimes/isAvailableAgainstClock";

export function useStockLock(
  ownedStock: OwnedStock,
  stockSymbol: string
): IsAvailable {
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const maybeStockLock = useStockTimesSelector(selectPlayerPortfolio)
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

  const availableLockedUntil = isAvailableAgainstClock(
    cycle,
    ownedStock.lockedUntil?.lockedAt,
    ownedStock.lockedUntil?.availabilityTime
  );

  const availableStockLock = isAvailableAgainstClock(
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
