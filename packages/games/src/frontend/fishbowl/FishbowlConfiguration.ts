import { FishbowlGameConfiguration } from "../../backend/fishbowl/fishbowl";
import { MapGameConfiguration } from "../baseConfiguration";

export const FishbowlConfiguration: MapGameConfiguration<FishbowlGameConfiguration> =
  {
    timePerPlayer: {
      default: { 1: 45, 2: 60, 3: 30, 4: 30, 5: 30 },
      label: "Time per round",
      order: 2,
      required: false,
      totalRoundsKey: "totalRounds",
      type: "round-timer"
    },
    totalRounds: {
      default: 3,
      label: "Total rounds",
      max: 5,
      min: 1,
      order: 1,
      required: true,
      type: "number"
    },
    wordsPerPlayer: {
      default: 5,
      label: "Words per player",
      max: 10,
      min: 1,
      order: 0,
      required: true,
      type: "number"
    }
  };
