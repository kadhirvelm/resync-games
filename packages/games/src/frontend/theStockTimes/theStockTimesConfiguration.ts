import { TheStockTimesGameConfiguration } from "../../backend/theStockTimes/theStockTimes";
import { MapGameConfiguration } from "../baseConfiguration";

export const TheStockTimesConfiguration: MapGameConfiguration<TheStockTimesGameConfiguration> =
  {
    startingCash: {
      default: 1_000,
      defaultChange: 100,
      label: "Starting cash",
      max: 50_000,
      min: 100,
      required: true,
      type: "number"
    },
    stockCycleTime: {
      default: 12,
      divisibleBy: 3,
      label: "Stock cycle time (seconds, ÷ 3)",
      max: 21,
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
