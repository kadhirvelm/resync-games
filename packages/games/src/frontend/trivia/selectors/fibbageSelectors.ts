import { FibbageRound } from "@/src/backend/trivia/trivia";
import { createSelector } from "@reduxjs/toolkit";
import { TriviaReduxState } from "../store/triviaRedux";
import { currentTriviaRound } from "./commonSelectors";

type currentFibbageGameState =
  | "waiting-for-answers"
  | "waiting-for-guesses"
  | "finished";

export interface ExtendedFibbageRound extends FibbageRound {
  activePlayers: {
    answer: string | null;
    guess: string | null;
    name: string;
    playerId: string;
  }[];
  allAnswers: string[];
  currentGameState: currentFibbageGameState;
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

    // Game states
    // If no. of answers < no. of players, we are waiting for answers.
    // If no. of guesses < no. of players, we are waiting for guesses.
    let currentGameState: currentFibbageGameState = "waiting-for-answers";
    if (allPlayerAnswers.length < players.length) {
      currentGameState = "waiting-for-answers";
    } else if (Object.keys(round.guesses).length < players.length) {
      currentGameState = "waiting-for-guesses";
    } else {
      currentGameState = "finished";
    }

    return {
      ...round,
      activePlayers,
      allAnswers,
      currentGameState
    } as ExtendedFibbageRound;
  }
);
