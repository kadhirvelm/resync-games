import {
  GameStateStoreWithStates,
  getGameHooks,
  RecursivePartial,
  updateGameState,
  updateLocalState
} from "@/redux";
import { Player } from "@resync-games/api";
import { TheStockTimesGame } from "../../../backend/theStockTimes/theStockTimes";
import { TheStockTimesLocalState } from "./theStockTimesLocalState";

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
  useGameStateAppStore,
  useGameStateDispatch,
  useGameStateSelector
} = getGameHooks<TheStockTimesGame, TheStockTimesLocalState>();
