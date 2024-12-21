import { PawnId } from "../../../backend/snatch-the-snack/snatchTheSnack";

export interface SnatchTheSnackLocalState {
  selectedPawn: PawnId | undefined;
}

export const INITIAL_SNATCH_THE_SNACK_LOCAL_STATE: SnatchTheSnackLocalState = {
  selectedPawn: undefined
};
