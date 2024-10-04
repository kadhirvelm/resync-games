import {
  getGameHooks,
  RecursivePartial,
  updateGameState,
  updateLocalState
} from "@/redux";
import {
  PawnId,
  SnatchTheSnackGame
} from "../../../backend/snatch-the-snack/snatchTheSnack";

export interface SnatchTheSnackLocalState {
  selectedPawn: PawnId | undefined;
}

export const updateSnatchTheSnackGameState = (
  newGameState: RecursivePartial<SnatchTheSnackGame>
) => {
  return updateGameState(newGameState);
};

export const updateSnatchTheSnackLocalState = (
  newLocalState: RecursivePartial<SnatchTheSnackLocalState>
) => {
  return updateLocalState(newLocalState);
};

export const {
  useGameStateAppStore,
  useGameStateDispatch,
  useGameStateSelector
} = getGameHooks<SnatchTheSnackGame, SnatchTheSnackLocalState>();
