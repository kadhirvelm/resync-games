import { createSelector } from "@reduxjs/toolkit";
import { TriviaReduxState } from "../../store/triviaRedux";
import { PlayerId } from "@/imports/api";

export const currentFibbageQuestion = createSelector(
  [(state: TriviaReduxState) => state.gameStateSlice.gameState?.rounds],
  (rounds): string | undefined => {
    if (!rounds || rounds.length === 0) {
      return undefined;
    }
    const currentRound = rounds[rounds.length - 1];
    if (!currentRound || currentRound.type !== "fibbage") {
      return undefined;
    }
    return currentRound.question;
  }
);

export const currentNumPlayers = createSelector(
  [(state: TriviaReduxState) => state.gameStateSlice.gameInfo?.players],
  (players): number => {
    if (!players) {
      return 0;
    }
    return players.length;
  }
);

export const currentFibbageSubmittedAnswers = createSelector(
  [(state: TriviaReduxState) => state.gameStateSlice.gameState?.rounds],
  (rounds): { [playerId: PlayerId]: string } => {
    if (!rounds || rounds.length === 0) {
      return {};
    }
    const currentRound = rounds[rounds.length - 1];
    if (!currentRound || currentRound.type !== "fibbage") {
      return {};
    }
    // Filter any "lastUpdatedAt" properties from the answers.
    // This is because the answers are stored as a PlayerAnswers type which includes a timestamp.
    return Object.fromEntries(
      Object.entries(currentRound.answers)
        // filter out the timestamp entry
        .filter(([key]) => key !== "lastUpdatedAt")
        .map(([playerId, answer]) => [playerId, answer.trim()])
    );
  }
);

export const currentFibbagePlayerGuesses = createSelector(
  [(state: TriviaReduxState) => state.gameStateSlice.gameState?.rounds],
  (rounds): { [playerId: PlayerId]: string } => {
    if (!rounds || rounds.length === 0) {
      return {};
    }
    const currentRound = rounds[rounds.length - 1];
    if (!currentRound || currentRound.type !== "fibbage") {
      return {};
    }

    // Filter any "lastUpdatedAt" properties from the guesses.
    // This is because the guesses are stored as a PlayerGuesses type which includes a timestamp
    return Object.fromEntries(
      Object.entries(currentRound.guesses)
        // filter out the timestamp entry
        .filter(([key]) => key !== "lastUpdatedAt")
        .map(([playerId, guess]) => [playerId, guess.trim()])
    );
  }
);

export const currentFibbageCorrectAnswer = createSelector(
  [(state: TriviaReduxState) => state.gameStateSlice.gameState?.rounds],
  (rounds): string | undefined => {
    if (!rounds || rounds.length === 0) {
      return undefined;
    }
    const currentRound = rounds[rounds.length - 1];
    if (!currentRound || currentRound.type !== "fibbage") {
      return undefined;
    }
    return currentRound.correctAnswer;
  }
);
