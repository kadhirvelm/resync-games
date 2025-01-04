import { useEffect, useState } from "react";
import { OwnedStock } from "../../../backend/theStockTimes/theStockTimes";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { isAvailable, IsAvailable } from "./utils/isAvailable";

export function useStockLock(ownedStock: OwnedStock): IsAvailable {
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

  if (cycle === undefined || ownedStock.lockedUntil === undefined) {
    return {
      isAvailable: true,
      timeLeft: 0
    };
  }

  return isAvailable(
    cycle,
    ownedStock.lockedUntil?.lockedAt,
    ownedStock.lockedUntil?.availabilityTime
  );
}
