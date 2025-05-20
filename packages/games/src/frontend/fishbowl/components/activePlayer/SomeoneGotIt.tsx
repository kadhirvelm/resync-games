import { Button } from "@/lib/radix";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../store/fishbowlRedux";
import { selectActiveRound, selectFishbowlPlayer } from "../../store/selectors";
import { FishbowlRound } from "../../../../backend";
import { cloneDeep, isEqual, sample } from "lodash-es";

export const SomeoneGotIt = () => {
  const dispatch = useFishbowlDispatch();

  const activePlayer = useFishbowlSelector(selectFishbowlPlayer);
  const activeRound = useFishbowlSelector(selectActiveRound);
  if (activePlayer === undefined || activeRound === undefined) {
    return;
  }

  const onAdvanceWord = () => {
    const updatedRound: FishbowlRound = cloneDeep(activeRound);
    updatedRound.lastUpdatedAt = new Date().toISOString();

    updatedRound.correctGuesses.push({
      ...activeRound.currentActiveWord,
      currentActivePlayer: activeRound.currentActivePlayer.player,
      guess: activeRound.currentActiveWord.word,
      guessingPlayer: activePlayer,
      roundNumber: activeRound.roundNumber,
      timestamp: new Date().toISOString()
    });

    const newWord = sample(updatedRound.remainingWords);
    if (newWord === undefined) {
      // Round has ended! Need to start a new round.
      updatedRound.remainingWords = [];
      return;
    }

    updatedRound.currentActiveWord = newWord;
    const newWordIndex = updatedRound.remainingWords.findIndex((word) =>
      isEqual(word, newWord)
    );
    updatedRound.remainingWords.splice(newWordIndex, 1);

    dispatch(
      updateFishbowlGameState(
        {
          round: updatedRound
        },
        activePlayer
      )
    );
  };

  return <Button onClick={onAdvanceWord}>Someone got it!</Button>;
};
