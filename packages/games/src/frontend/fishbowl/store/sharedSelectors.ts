import { createSelector } from "@reduxjs/toolkit";
import { FishbowlReduxState } from "./fishbowlRedux";
import { FishbowlRound } from "../../../backend";

export type FishbowlPhase =
  | "word-contribution"
  | "active-player"
  | FishbowlRound;

export const currentPhaseSelector = createSelector(
  [
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.round,
    (state: FishbowlReduxState) => state.playerSlice.player
  ],
  (round, player): FishbowlPhase => {
    if (round === undefined) {
      return "word-contribution";
    }

    if (round.currentActivePlayer.player.playerId === player?.playerId) {
      return "active-player";
    }

    return round;
  }
);
