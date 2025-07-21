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
    return currentRound.answers;
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
    return currentRound.guesses;
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
