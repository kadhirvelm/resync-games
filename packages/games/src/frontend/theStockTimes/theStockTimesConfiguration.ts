import { TheStockTimesGameConfiguration } from "../../backend/theStockTimes/theStockTimes";
import { MapGameConfiguration } from "../baseConfiguration";

export const TheStockTimesConfiguration: MapGameConfiguration<TheStockTimesGameConfiguration> =
  {
    startingCash: {
      default: 100_000,
      label: "Starting cash",
      max: 1_000_000,
      min: 1_000,
      required: true,
      type: "number"
    },
    totalStocks: {
      default: 5,
      label: "Total stocks",
      max: 10,
      min: 2,
      required: true,
      type: "number"
    }
  };
