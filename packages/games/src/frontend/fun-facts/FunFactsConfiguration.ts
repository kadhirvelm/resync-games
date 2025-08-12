import { FunFactsGameConfiguration } from "../../backend/fun-facts/funFacts";
import { MapGameConfiguration } from "../baseConfiguration";

export const FunFactsConfiguration: MapGameConfiguration<FunFactsGameConfiguration> =
  {
    factsPerPlayer: {
      default: 3,
      label: "Facts per player",
      max: 10,
      min: 1,
      order: 0,
      required: true,
      type: "number"
    }
  };
