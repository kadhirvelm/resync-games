import { TriviaRound } from "@/src/backend/trivia/trivia";
import { createSelector } from "@reduxjs/toolkit";
import { TriviaReduxState } from "../store/triviaRedux";

export const currentTriviaRound = createSelector(
  [(state: TriviaReduxState) => state.gameStateSlice.gameState?.rounds],
  (rounds): TriviaRound | undefined => {
    if (!rounds || rounds.length === 0) {
      return undefined;
    }
    return rounds[rounds.length - 1];
  }
);
