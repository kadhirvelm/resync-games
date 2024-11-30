import {
  getGameHooks,
  RecursivePartial,
  updateGameState,
  updateLocalState
} from "@/redux";
import { Player } from "@resync-games/api";
import { TheStockTimesGame } from "../../../backend/theStockTimes/theStockTimes";

export interface TheStockTimesLocalState {}

export const updateSnatchTheSnackGameState = (
  newGameState: RecursivePartial<TheStockTimesGame>,
  player: Player
) => {
  return updateGameState({ gameState: newGameState, player });
};

export const updateSnatchTheSnackLocalState = (
  newLocalState: RecursivePartial<TheStockTimesLocalState>
) => {
  return updateLocalState(newLocalState);
};

export const {
  useGameStateAppStore,
  useGameStateDispatch,
  useGameStateSelector
} = getGameHooks<TheStockTimesGame, TheStockTimesLocalState>();
