import {
  GameStateStoreWithStates,
  getGameHooks,
  RecursivePartial,
  updateGameState,
  updateLocalState
} from "@/redux";
import { Player } from "@/imports/api";
import { FishbowlGame } from "../../../backend";
import { FishbowlLocalState } from "./fishbowlLocalState";

export const updateFishbowlGameState = (
  newGameState: RecursivePartial<FishbowlGame>,
  player: Player
) => {
  return updateGameState({ gameState: newGameState, player });
};

export const updateFishbowlLocalState = (
  newLocalState: RecursivePartial<FishbowlLocalState>
) => {
  return updateLocalState(newLocalState);
};

export type FishbowlReduxState = GameStateStoreWithStates<
  FishbowlGame,
  FishbowlLocalState
>;

export const {
  useGameStateAppStore: useFishbowlAppStore,
  useGameStateDispatch: useFishbowlDispatch,
  useGameStateSelector: useFishbowlSelector
} = getGameHooks<FishbowlGame, FishbowlLocalState>();
