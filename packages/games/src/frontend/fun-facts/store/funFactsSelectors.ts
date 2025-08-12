import { createSelector } from "@reduxjs/toolkit";
import { FunFactsReduxState } from "./funFactsRedux";
import { FunFactsGameConfiguration } from "../../../backend/fun-facts";

// Get the current player's submissions
export const currentPlayerSubmissionsSelector = createSelector(
  [
    (state: FunFactsReduxState) => state.gameStateSlice.gameState,
    (state: FunFactsReduxState) => state.playerSlice.player?.playerId
  ],
  (gameState, playerId) => {
    if (!gameState || !playerId) return null;

    return gameState?.playerSubmissions[playerId] || null;
  }
);

// Get the number of facts submitted by current player
export const currentPlayerFactCountSelector = createSelector(
  [currentPlayerSubmissionsSelector],
  (submissions) => {
    return submissions?.facts.length || 0;
  }
);

// Check if current player has submitted all required facts
export const hasPlayerFinishedSubmittingSelector = createSelector(
  [
    currentPlayerFactCountSelector,
    (state: FunFactsReduxState) =>
      (
        state.gameStateSlice.gameInfo
          ?.gameConfiguration as FunFactsGameConfiguration
      )?.factsPerPlayer || 0
  ],
  (submittedCount, requiredCount) => {
    return submittedCount >= requiredCount;
  }
);

// Get all facts for display
export const allFactsSelector = createSelector(
  [(state: FunFactsReduxState) => state.gameStateSlice.gameState],
  (gameState) => {
    return gameState?.allFacts || [];
  }
);

// Check if all players have finished submitting
export const allPlayersFinishedSelector = createSelector(
  [
    (state: FunFactsReduxState) => state.gameStateSlice.gameState,
    (state: FunFactsReduxState) => state.gameStateSlice.gameInfo?.players,
    (state: FunFactsReduxState) =>
      (
        state.gameStateSlice.gameInfo
          ?.gameConfiguration as FunFactsGameConfiguration
      )?.factsPerPlayer || 0
  ],
  (gameState, players, requiredCount) => {
    if (!gameState || !players || players.length === 0) return false;

    return players.every((player) => {
      const submissions = gameState.playerSubmissions[player.playerId];
      return (submissions?.facts.length || 0) >= requiredCount;
    });
  }
);

// Determine current phase of the game
export const currentPhaseSelector = createSelector(
  [allPlayersFinishedSelector],
  (allPlayersFinished) => {
    if (!allPlayersFinished) return "collecting-facts";
    return "viewing-facts";
  }
);
