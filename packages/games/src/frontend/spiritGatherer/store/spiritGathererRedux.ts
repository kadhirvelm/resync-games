import {
  GameStateStoreWithStates,
  getGameHooks,
  RecursivePartial,
  updateGameState,
  updateLocalState
} from "@/redux";
import { Player } from "@resync-games/api";
import { SpiritGathererGame } from "../../../backend/spiritGatherer/spiritGatherer";
import { SpiritGathererLocalState } from "./spiritGathererLocalState";

export const updateSpiritGathererGameState = (
  newGameState: RecursivePartial<SpiritGathererGame>,
  player: Player
) => {
  return updateGameState({ gameState: newGameState, player });
};

export const updateSpiritGathererLocalState = (
  newLocalState: RecursivePartial<SpiritGathererLocalState>
) => {
  return updateLocalState(newLocalState);
};

export type SpiritGathererReduxState = GameStateStoreWithStates<
  SpiritGathererGame,
  SpiritGathererLocalState
>;

export const {
  useGameStateAppStore: useSpiritGathererAppStore,
  useGameStateDispatch: useSpiritGathererDispatch,
  useGameStateSelector: useSpiritGathererSelector
} = getGameHooks<SpiritGathererGame, SpiritGathererLocalState>();
