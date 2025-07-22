import { TriviaRound } from "../../../backend/trivia/trivia";
import { createSelector } from "@reduxjs/toolkit";
import { TriviaReduxState } from "../store/triviaRedux";

export const currentTriviaRound = createSelector(
  [(state: TriviaReduxState) => state.gameStateSlice.gameState?.rounds],
  (rounds): TriviaRound | undefined => {
    if (!rounds || Object.keys(rounds).length === 0) {
      return undefined;
    }
    return rounds[Object.keys(rounds).length - 1];
  }
);

export const currentScores = createSelector(
  [(state: TriviaReduxState) => state.gameStateSlice.gameState?.scores],
  (scores) => {
    return scores;
  }
);

export const currentPlayer = createSelector(
  [(state: TriviaReduxState) => state.playerSlice.player],
  (player) => {
    return player;
  }
);
