import { createSelector } from "@reduxjs/toolkit";
import { FishbowlReduxState } from "./fishbowlRedux";
import { FishbowlRound } from "../../../backend";

export type FishbowlPhase =
  | "word-contribution"
  | "active-player"
  | "waiting"
  | "finished"
  | FishbowlRound;

export const currentPhaseSelector = createSelector(
  [
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.round,
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameInfo?.currentGameState
  ],
  (round, player, currentGameState): FishbowlPhase => {
    if (currentGameState === "waiting") {
      return "waiting";
    }

    if (currentGameState === "finished") {
      return "finished";
    }

    if (round === undefined) {
      return "word-contribution";
    }

    if (round.currentActivePlayer.player.playerId === player?.playerId) {
      return "active-player";
    }

    return round;
  }
);
