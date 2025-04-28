import { FishbowlGameConfiguration } from "../../backend/fishbowl/fishbowl";
import { MapGameConfiguration } from "../baseConfiguration";

export const FishbowlConfiguration: MapGameConfiguration<FishbowlGameConfiguration> =
  {
    timePerPlayer: {
      default: { 1: 45, 2: 45, 3: 45, 4: 45, 5: 45 },
      label: "Time per player",
      required: false,
      type: "noop"
    },
    totalRounds: {
      default: 3,
      label: "Total rounds",
      max: 5,
      min: 1,
      required: true,
      type: "number"
    },
    wordsPerPlayer: {
      default: 5,
      label: "Words per player",
      max: 10,
      min: 1,
      required: true,
      type: "number"
    }
  };
