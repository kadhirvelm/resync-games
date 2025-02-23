import { StockPriceHistory } from "../../../backend/theStockTimes/theStockTimes";

const RECENT_DATAPOINTS = 20;

export function getRecentStockHistory(stockPriceHistory: StockPriceHistory[]) {
  const latestDataPoints = stockPriceHistory
    .map((h) => [new Date(h.lastUpdatedAt).valueOf(), h.price])
    .slice(0, RECENT_DATAPOINTS)
    .reverse();

  const x = latestDataPoints.map((d) => d[0] ?? 0);
  const y = latestDataPoints.map((d) => d[1] ?? 0);

  return { x, y };
}
