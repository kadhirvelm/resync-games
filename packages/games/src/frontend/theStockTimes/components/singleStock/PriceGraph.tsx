import { useMemo } from "react";
import { useGameStateSelector } from "../../store/theStockTimesRedux";
import { TimeSeries } from "../graph/TimeSeries";
import { getRecentStockHistory } from "../../utils/getRecentHistory";

export const PriceGraph = ({
  viewingStockSymbol
}: {
  viewingStockSymbol: string;
}) => {
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

  return <TimeSeries x={x} y={y} />;
};
