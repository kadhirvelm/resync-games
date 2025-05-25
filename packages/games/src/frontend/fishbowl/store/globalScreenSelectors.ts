import { createSelector } from "@reduxjs/toolkit";
import { PlayerInGame } from "@resync-games/api";
import {
  FishbowlGameConfiguration,
  FishbowlSinglePlayerContributions
} from "../../../backend";
import { FishbowlReduxState } from "./fishbowlRedux";

export const selectCurrentWordContribution = createSelector(
  [
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameInfo?.gameConfiguration as
        | FishbowlGameConfiguration
        | undefined,
    (state: FishbowlReduxState) => state.gameStateSlice.gameInfo?.players,
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameState?.playerWordContributions
  ],
  (gameConfiguration, allPlayers, currentContributions) => {
    if (
      gameConfiguration === undefined ||
      allPlayers === undefined ||
      currentContributions === undefined
    ) {
      return;
    }

    const expectedWordCount =
      gameConfiguration.wordsPerPlayer * allPlayers.length;

    const waitingOnPlayers: PlayerInGame[] = allPlayers.slice();
    let currentWordCount = 0;

    for (const singlePlayerContribution of Object.values(
      currentContributions
    ) as FishbowlSinglePlayerContributions[]) {
      const thisPlayerCount = singlePlayerContribution.words.length;
      currentWordCount += thisPlayerCount;

      if (thisPlayerCount >= gameConfiguration.wordsPerPlayer) {
        const index = waitingOnPlayers.findIndex(
          (player) =>
            player.playerId === singlePlayerContribution.player.playerId
        );
        if (index !== -1) {
          waitingOnPlayers.splice(index, 1);
        }
      }
    }

    return {
      currentWordCount,
      expectedWordCount,
      waitingOnPlayers
    };
  }
);

export const selectPreviousWord = createSelector(
  [
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameState?.round?.correctGuesses
  ],
  (correctGuesses) => {
    if (correctGuesses === undefined) {
      return;
    }

    return correctGuesses[correctGuesses.length - 1]?.guess;
  }
);
