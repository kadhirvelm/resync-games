import { TriviaGameConfiguration } from "@/src/backend/trivia/trivia";
import { MapGameConfiguration } from "../baseConfiguration";

export const TriviaConfiguration: MapGameConfiguration<TriviaGameConfiguration> =
  {
    totalRounds: {
      default: 3,
      label: "Total rounds",
      max: 5,
      min: 1,
      required: true,
      type: "number"
    }
  };
