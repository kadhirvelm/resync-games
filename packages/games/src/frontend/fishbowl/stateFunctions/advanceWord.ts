import { cloneDeep, isEqual, sample } from "lodash-es";
import { PlayerInGame } from "../../../../imports/api";
import { FishbowlGameConfiguration, FishbowlRound } from "../../../backend";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../store/fishbowlRedux";
import { newRound } from "./newRound";

export function getNewWord(updatedRound: FishbowlRound) {
  const newWord = sample(updatedRound.remainingWords);
  if (newWord === undefined) {
    updatedRound.currentActiveWord = undefined;

    return updatedRound;
  }

  updatedRound.currentActiveWord = newWord;
  const newWordIndex = updatedRound.remainingWords.findIndex((word) =>
    isEqual(word, newWord)
  );
  updatedRound.remainingWords.splice(newWordIndex, 1);

  return updatedRound;
}

export function advanceWord(
  activeRound: FishbowlRound,
  guessingPlayer: PlayerInGame
) {
  const updatedRound: FishbowlRound = cloneDeep(activeRound);
  updatedRound.lastUpdatedAt = new Date().toISOString();

  if (activeRound.currentActiveWord === undefined) {
    throw new Error("No active word found. Something went terribly wrong.");
  }

  updatedRound.correctGuesses.push({
    ...activeRound.currentActiveWord,
    currentActiveDrawing: undefined, // We don't want to store the drawing in the history, waste of space for now
    currentActivePlayer: activeRound.currentActivePlayer.player,
    currentActiveWord: activeRound.currentActiveWord,
    guess: activeRound.currentActiveWord.word,
    guessingPlayer: guessingPlayer,
    roundNumber: activeRound.roundNumber,
    timestamp: new Date().toISOString()
  });

  updatedRound.currentActiveDrawing = undefined;
  getNewWord(updatedRound);

  return updatedRound;
}

export function useAdvanceWord() {
  const dispatch = useFishbowlDispatch();

  const activeRound = useFishbowlSelector(
    (state) => state.gameStateSlice.gameState?.round
  );
  const gameState = useFishbowlSelector((s) => s.gameStateSlice.gameState);
  const allPlayers = useFishbowlSelector(
    (s) => s.gameStateSlice.gameInfo?.players
  );
  const gameConfiguration = useFishbowlSelector(
    (s) =>
      s.gameStateSlice.gameInfo?.gameConfiguration as
        | FishbowlGameConfiguration
        | undefined
  );

  if (
    activeRound === undefined ||
    gameState === undefined ||
    allPlayers === undefined ||
    gameConfiguration === undefined
  ) {
    return;
  }

  const onAdvanceWord = (guessingPlayer: PlayerInGame | undefined) => {
    if (guessingPlayer === undefined) {
      return;
    }

    const updatedRound = advanceWord(activeRound, guessingPlayer);
    if (updatedRound.currentActiveWord !== undefined) {
      dispatch(
        updateFishbowlGameState(
          {
            round: updatedRound
          },
          guessingPlayer
        )
      );
      return;
    }

    const newHistory = [...gameState.pastRounds.rounds, updatedRound];
    const { round, turnOrder } = newRound(
      gameState,
      allPlayers,
      gameConfiguration
    );

    console.log("Dispatching to backend", {
      lastUpdatedAt: new Date().toISOString(),
      pastRounds: {
        lastUpdatedAt: new Date().toISOString(),
        rounds: newHistory
      },
      round,
      turnOrder
    });

    dispatch(
      updateFishbowlGameState(
        {
          lastUpdatedAt: new Date().toISOString(),
          pastRounds: {
            lastUpdatedAt: new Date().toISOString(),
            rounds: newHistory
          },
          round,
          turnOrder
        },
        guessingPlayer
      )
    );
  };

  return onAdvanceWord;
}
