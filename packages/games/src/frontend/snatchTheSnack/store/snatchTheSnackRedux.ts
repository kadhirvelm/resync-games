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
import { Player } from "@resync-games/api";

export interface SnatchTheSnackLocalState {
  selectedPawn: PawnId | undefined;
}

export const updateSnatchTheSnackGameState = (
  newGameState: RecursivePartial<SnatchTheSnackGame>,
  player: Player
) => {
  return updateGameState({ gameState: newGameState, player });
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
