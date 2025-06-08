import { createSelector } from "@reduxjs/toolkit";
import { PlayerInGame } from "@resync-games/api";
import {
  FishbowlGameConfiguration,
  FishbowlSingleGuess,
  FishbowlSinglePlayerContributions,
  FishbowlSinglePlayerGuesses
} from "../../../../backend";
import { FishbowlReduxState } from "../../store/fishbowlRedux";
import { isEqual } from "lodash-es";
import { getNextPlayer } from "../../stateFunctions/advanceToNextPlayer";

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

    const correctGuess = correctGuesses[correctGuesses.length - 1];
    if (correctGuess === undefined) {
      return;
    }

    const someoneGotIt =
      correctGuess?.guessingPlayer.playerId ===
      correctGuess?.currentActivePlayer.playerId;

    return {
      player: correctGuess?.guessingPlayer.displayName,
      someoneGotIt,
      word: correctGuess?.guess
    };
  }
);

export const selectGuessesByTeam = createSelector(
  [
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.round,
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameState?.playerGuesses,
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.round
  ],
  (round, playerGuesses, activeRound) => {
    if (
      round === undefined ||
      playerGuesses === undefined ||
      activeRound === undefined
    ) {
      return;
    }

    const roundNumber = round.roundNumber;
    const guessesByTeam: Record<number, FishbowlSingleGuess[]> = {};

    Object.values(playerGuesses ?? {}).forEach((playerGuess) => {
      const guessesInRound: FishbowlSinglePlayerGuesses | undefined =
        playerGuess[roundNumber];

      if (guessesInRound === undefined) {
        return;
      }

      const playerTeam = guessesInRound.player.team ?? 0;
      const filteredGuesses = guessesInRound.guesses.filter(
        (guess) =>
          guess.currentActivePlayer.playerId ===
            activeRound.currentActivePlayer.player.playerId &&
          isEqual(guess.currentActiveWord, activeRound.currentActiveWord)
      );

      guessesByTeam[playerTeam] = (guessesByTeam[playerTeam] ?? []).concat(
        filteredGuesses
      );
    });

    return {
      correctGuess: round.currentActiveWord?.word,
      currentActiveTeam: round.currentActivePlayer.player.team ?? 0,
      currentRound: roundNumber,
      guessesByTeam
    };
  }
);

export const selectNextPlayer = createSelector(
  [
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.turnOrder,
    (state: FishbowlReduxState) => state.gameStateSlice.gameState?.round,
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameInfo?.players as PlayerInGame[] | undefined
  ],
  (turnOrder, activeRound, allPlayers) => {
    if (
      turnOrder === undefined ||
      activeRound === undefined ||
      allPlayers === undefined
    ) {
      return;
    }

    return getNextPlayer(turnOrder, activeRound, allPlayers);
  }
);
