import { createSelector } from "@reduxjs/toolkit";
import { FishbowlGameConfiguration, FishbowlWord } from "../../../../backend";
import { FishbowlReduxState } from "../../store/fishbowlRedux";

export const selectFishbowlPlayer = createSelector(
  [
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) => state.gameStateSlice.gameInfo?.players
  ],
  (player, players) => {
    if (player === undefined || players === undefined) {
      return;
    }

    return players.find((p) => p.playerId === player.playerId);
  }
);

export const selectPlayerContributions = createSelector(
  [
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameState?.playerWordContributions
  ],
  (player, contributions) => {
    if (player === undefined) {
      return;
    }

    return contributions?.[player.playerId];
  }
);

export const selectExpectedWordContributionCount = createSelector(
  [
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameInfo?.gameConfiguration as
        | FishbowlGameConfiguration
        | undefined
  ],
  (gameConfiguration) => {
    return gameConfiguration?.wordsPerPlayer ?? 0;
  }
);

export const selectActiveRound = createSelector(
  [
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.round,
    (state: FishbowlReduxState) => state.playerSlice.player
  ],
  (round, player) => {
    if (
      round === undefined ||
      player === undefined ||
      round.currentActivePlayer.player.playerId !== player.playerId
    ) {
      return;
    }

    return round;
  }
);

export const selectPlayerGuesses = createSelector(
  [
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameState?.round?.roundNumber,
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.playerGuesses
  ],
  (player, roundNumber, guesses) => {
    if (
      player === undefined ||
      roundNumber === undefined ||
      guesses === undefined
    ) {
      return;
    }

    return guesses[player.playerId]?.[roundNumber];
  }
);

export const selectNewPlayerGuess = createSelector(
  [
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) => state.gameStateSlice.gameInfo?.players,
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.round,
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.playerGuesses
  ],
  (player, allPlayers, round, guesses) => {
    if (player === undefined || round === undefined || guesses === undefined) {
      return;
    }

    return {
      activePlayer: round.currentActivePlayer.player,
      currentActiveWord: round.currentActiveWord,
      currentRoundGuesses: guesses[player.playerId]?.[round.roundNumber],
      player: allPlayers?.find((p) => p.playerId === player.playerId),
      roundNumber: round.roundNumber
    };
  }
);

export const selectAllPlayerContributions = createSelector(
  [
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameState?.playerWordContributions,
    (state: FishbowlReduxState) => state.gameStateSlice.gameInfo?.players
  ],
  (contributions, players) => {
    if (contributions === undefined || players === undefined) {
      return;
    }

    const allWords = Object.values(contributions).flatMap(
      ({ words }): FishbowlWord[] => words
    );

    allWords.sort((a, b) => a.word.localeCompare(b.word));

    return allWords;
  }
);
