import {
  GameStateStoreWithStates,
  getGameHooks,
  RecursivePartial,
  updateGameState,
  updateLocalState
} from "@/redux";
import { Player } from "@/imports/api";
import { FunFactsLocalState } from "./funFactsLocalState";
import { FunFactsGame } from "../../../backend/fun-facts";

export const updateFunFactsGameState = (
  newGameState: RecursivePartial<FunFactsGame>,
  player: Player
) => {
  return updateGameState({ gameState: newGameState, player });
};

export const updateFunFactsLocalState = (
  newLocalState: RecursivePartial<FunFactsLocalState>
) => {
  return updateLocalState(newLocalState);
};

export type FunFactsReduxState = GameStateStoreWithStates<
  FunFactsGame,
  FunFactsLocalState
>;

export const {
  useGameStateAppStore: useFunFactsAppStore,
  useGameStateDispatch: useFunFactsDispatch,
  useGameStateSelector: useFunFactsSelector
} = getGameHooks<FunFactsGame, FunFactsLocalState>();
