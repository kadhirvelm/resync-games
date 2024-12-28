import { useMemo } from "react";
import { useGameStateSelector } from "../../store/theStockTimesRedux";
import { TimeSeries } from "../graph/TimeSeries";
import { getRecentStockHistory } from "../../utils/getRecentHistory";
import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";

export const PriceGraph = ({
  viewingStockSymbol
}: {
  viewingStockSymbol: string;
}) => {
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);
  const stocks = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );
  const thisStock = stocks?.[viewingStockSymbol];

  const { x, y } = useMemo(() => {
    if (thisStock === undefined) {
      return { x: [], y: [] };
    }

    return getRecentStockHistory(thisStock.history);
  }, [thisStock]);

  if (thisStock === undefined) {
    return;
  }

  const xAxisLabel = (value: number) =>
    cycle === undefined ? undefined : cycleTime(cycle, value).day.toString();

  const xAxisCursor = (value: number) => {
    if (cycle === undefined) {
      return;
    }

    const { day, timeFraction } = cycleTime(cycle, value);
    return `Day ${day} at ${Math.round(timeFraction * 100)}%`;
  };

  return (
    <TimeSeries x={x} xAxisCursor={xAxisCursor} xAxisLabel={xAxisLabel} y={y} />
  );
};
