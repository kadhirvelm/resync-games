import { Player } from "@/imports/api";
import { TheStockTimesGame } from "../../../backend/theStockTimes/theStockTimes";
import { TheStockTimesLocalState } from "./theStockTimesLocalState";
import {
  RecursivePartial,
  updateGameState,
  updateLocalState,
  GameStateStoreWithStates,
  getGameHooks
} from "@/redux";

export const updateTheStockTimesGameState = (
  newGameState: RecursivePartial<TheStockTimesGame>,
  player: Player
) => {
  return updateGameState({ gameState: newGameState, player });
};

export const updateTheStockTimesLocalState = (
  newLocalState: RecursivePartial<TheStockTimesLocalState>
) => {
  return updateLocalState(newLocalState);
};

export type TheStockTimesReduxState = GameStateStoreWithStates<
  TheStockTimesGame,
  TheStockTimesLocalState
>;

export const {
  useGameStateAppStore: useStockTimesAppStore,
  useGameStateDispatch: useStockTimesGameStateDispatch,
  useGameStateSelector: useStockTimesSelector
} = getGameHooks<TheStockTimesGame, TheStockTimesLocalState>();
