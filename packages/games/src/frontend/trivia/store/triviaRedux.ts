import { TriviaGame } from "../../../backend/trivia/trivia";
import { TriviaLocalState } from "./triviaLocalState";
import {
  GameStateStoreWithStates,
  getGameHooks,
  RecursivePartial,
  updateGameState,
  updateLocalState
} from "@/redux";
import { Player } from "@/imports/api";

export const {
  useGameStateAppStore: useTriviaAppStore,
  useGameStateDispatch: useTriviaDispatch,
  useGameStateSelector: useTriviaSelector
} = getGameHooks<TriviaGame, TriviaLocalState>();

export const updateTriviaGameState = (
  newGameState: RecursivePartial<TriviaGame>,
  player: Player
) => {
  return updateGameState({ gameState: newGameState, player });
};

export const updateTriviaLocalState = (
  newLocalState: RecursivePartial<TriviaLocalState>
) => {
  return updateLocalState(newLocalState);
};

export type TriviaReduxState = GameStateStoreWithStates<
  TriviaGame,
  TriviaLocalState
>;
