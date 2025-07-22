import { createSelector } from "@reduxjs/toolkit";
import { TriviaReduxState } from "../store/triviaRedux";
import { currentTriviaRound } from "./commonSelectors";
import { FibbageRound } from "../../../backend/trivia/trivia";

export interface ExtendedFibbageRound extends FibbageRound {
  activePlayers: {
    answer: string | null;
    guess: string | null;
    name: string;
    playerId: string;
  }[];
  allAnswers: string[];
}

export const currentFibbageRound = createSelector(
  [
    currentTriviaRound,
    (state: TriviaReduxState) => state.gameStateSlice.gameInfo?.players
  ],
  (round, players) => {
    if (!round || round.type !== "fibbage" || !players) {
      return undefined;
    }

    const activePlayers = players.map((player) => ({
      answer: round.answers[player.playerId] || null,
      guess: round.guesses[player.playerId] || null,
      name: player.displayName,
      playerId: player.playerId
    }));

    const allPlayerAnswers = Object.values(round.answers)
      .map((answer) => answer.trim())
      .filter((answer) => answer.length > 0) as string[];

    let allAnswers = [...allPlayerAnswers, round.correctAnswer];
    // Remove duplicates and sort
    allAnswers = Array.from(new Set(allAnswers)).sort((a, b) =>
      a.localeCompare(b)
    );

    return {
      ...round,
      activePlayers,
      allAnswers
    } as ExtendedFibbageRound;
  }
);
