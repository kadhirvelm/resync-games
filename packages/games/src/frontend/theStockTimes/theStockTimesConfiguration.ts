import { TheStockTimesGameConfiguration } from "../../backend/theStockTimes/theStockTimes";
import { MapGameConfiguration } from "../baseConfiguration";

export const TheStockTimesConfiguration: MapGameConfiguration<TheStockTimesGameConfiguration> =
  {
    startingCash: {
      default: 100_000,
      defaultChange: 10_000,
      label: "Starting cash",
      max: 500_000,
      min: 10_000,
      required: true,
      type: "number"
    },
    stockCycleTime: {
      default: 12,
      divisibleBy: 3,
      label: "Stock cycle time (seconds, ÷ 3)",
      max: 30,
      min: 6,
      required: true,
      type: "number"
    },
    totalStocks: {
      default: 4,
      label: "Total stocks",
      max: 8,
      min: 2,
      required: true,
      type: "number"
    }
  };
