import {
  getGameHooks,
  RecursivePartial,
  updateGameState,
  updateLocalState
} from "@/redux";
import { Player } from "@/imports/api";
import { SnatchTheSnackGame } from "../../../backend/snatch-the-snack/snatchTheSnack";
import { SnatchTheSnackLocalState } from "./snatchTheSnackLocalState";

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
