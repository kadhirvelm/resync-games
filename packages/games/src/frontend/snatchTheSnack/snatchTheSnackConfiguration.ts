import { SnatchTheSnackGameConfiguration } from "../../backend/snatch-the-snack/snatchTheSnack";
import { MapGameConfiguration } from "../baseConfiguration";

export const SnatchTheSnackConfiguration: MapGameConfiguration<SnatchTheSnackGameConfiguration> =
  {
    pawnCount: {
      default: 4,
      label: "Number of pawns",
      max: 4,
      min: 1,
      required: true,
      type: "number"
    }
  };
