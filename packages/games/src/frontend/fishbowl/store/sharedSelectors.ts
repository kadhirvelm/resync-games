import { createSelector } from "@reduxjs/toolkit";
import { FishbowlReduxState } from "./fishbowlRedux";
import { FishbowlRound } from "../../../backend";

export type FishbowlPhase = "word-contribution" | FishbowlRound;

export const currentPhaseSelector = createSelector(
  [(state: FishbowlReduxState) => state.gameStateSlice.gameState?.round],
  (round): FishbowlPhase => {
    if (round === undefined) {
      return "word-contribution";
    }

    return round;
  }
);
