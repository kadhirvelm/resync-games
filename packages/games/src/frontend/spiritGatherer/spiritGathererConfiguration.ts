import { SpiritGathererGameConfiguration } from "../../backend/spiritGatherer/spiritGatherer";
import { MapGameConfiguration } from "../baseConfiguration";

export const SpiritGathererConfiguration: MapGameConfiguration<SpiritGathererGameConfiguration> =
  {
    numberOfRounds: {
      default: 3,
      label: "Number of rounds",
      max: 3,
      min: 1,
      required: true,
      type: "number"
    }
  };
