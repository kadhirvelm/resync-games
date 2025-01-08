import { useEffect, useState } from "react";
import { selectPlayerPortfolio } from "../store/selectors";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { isAvailable, IsAvailable } from "./utils/isAvailable";

export function useCashSpendLock(): IsAvailable {
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);
  const cashSpendLock = useGameStateSelector(
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

  return isAvailable(
    cycle,
    cashSpendLock?.lockedAt,
    cashSpendLock?.availabilityTime
  );
}
