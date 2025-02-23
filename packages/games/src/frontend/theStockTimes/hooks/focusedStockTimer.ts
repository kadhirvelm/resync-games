import {
  IsAvailable,
  isAvailableAgainstClock
} from "@resync-games/games-shared/theStockTimes/isAvailableAgainstClock";
import { useEffect, useState } from "react";
import { useStockTimesSelector } from "../store/theStockTimesRedux";

export function useFocusedStockTimer(): IsAvailable {
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const stockInFocus = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.stockInFocus
  );

  const [_, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (cycle === undefined || stockInFocus === undefined) {
    return {
      isAvailable: true,
      timeLeft: 0
    };
  }

  return isAvailableAgainstClock(
    cycle,
    stockInFocus.focusedAt,
    stockInFocus.nextFocusIn
  );
}
