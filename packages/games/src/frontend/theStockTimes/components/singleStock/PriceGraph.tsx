import { useMemo } from "react";
import { useStockTimesSelector } from "../../store/theStockTimesRedux";
import { TimeSeries } from "../graph/TimeSeries";
import { getRecentStockHistory } from "../../utils/getRecentHistory";
import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { Stock } from "../../../../backend/theStockTimes/theStockTimes";

export const PriceGraph = ({ stock }: { stock: Stock }) => {
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);

  const { x, y } = useMemo(() => {
    if (stock === undefined) {
      return { x: [], y: [] };
    }

    return getRecentStockHistory(stock.history);
  }, [stock]);

  if (stock === undefined) {
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
