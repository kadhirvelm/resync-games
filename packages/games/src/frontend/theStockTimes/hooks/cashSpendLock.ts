import { useEffect, useState } from "react";
import { selectPlayerPortfolio } from "../store/selectors";
import { useStockTimesSelector } from "../store/theStockTimesRedux";
import {
  isAvailableAgainstClock,
  IsAvailable
} from "../../../shared/theStockTimes/isAvailableAgainstClock";

export function useCashSpendLock(): IsAvailable {
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const cashSpendLock = useStockTimesSelector(
    selectPlayerPortfolio
  )?.lockCashSpending;

  const [_, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (cycle === undefined || cashSpendLock === undefined) {
    return {
      isAvailable: true,
      timeLeft: 0
    };
  }

  return isAvailableAgainstClock(
    cycle,
    cashSpendLock?.lockedAt,
    cashSpendLock?.availabilityTime
  );
}
