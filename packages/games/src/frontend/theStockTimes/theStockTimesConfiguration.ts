import { TheStockTimesGameConfiguration } from "../../backend/theStockTimes/theStockTimes";
import { MapGameConfiguration } from "../baseConfiguration";

export const TheStockTimesConfiguration: MapGameConfiguration<TheStockTimesGameConfiguration> =
  {
    startingCash: {
      default: 10_000,
      label: "Starting cash",
      max: 100_000,
      min: 100,
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
