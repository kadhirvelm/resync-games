import { Button, Flex, TextField } from "@/lib/radix";
import { useState } from "react";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../store/fishbowlRedux";
import { selectNewPlayerGuess } from "../selectors/selectors";
import {
  FishbowlAllPlayerGuesses,
  FishbowlSingleGuess,
  FishbowlSinglePlayerGuesses
} from "../../../../backend";

export const SubmitGuess = () => {
  const dispatch = useFishbowlDispatch();
  const maybeNewGuessDetails = useFishbowlSelector(selectNewPlayerGuess);

  const [guess, setGuess] = useState("");

  const onGuess = () => {
    const sanitizedGuess = guess.trim();
    if (
      sanitizedGuess.length === 0 ||
      maybeNewGuessDetails === undefined ||
      maybeNewGuessDetails.player === undefined ||
      maybeNewGuessDetails.currentActiveWord === undefined
    ) {
      return;
    }

    const newGuess: FishbowlSingleGuess = {
      currentActivePlayer: maybeNewGuessDetails.activePlayer,
      currentActiveWord: maybeNewGuessDetails.currentActiveWord,
      guess: sanitizedGuess,
      guessingPlayer: maybeNewGuessDetails.player,
      roundNumber: maybeNewGuessDetails.roundNumber,
      timestamp: new Date().toISOString()
    };

    const existingGuesses =
      maybeNewGuessDetails.currentRoundGuesses?.guesses ?? [];

    const updatedRoundGuesses: FishbowlSinglePlayerGuesses = {
      guesses: [newGuess].concat(existingGuesses),
      lastUpdatedAt: new Date().toISOString(),
      player: maybeNewGuessDetails.player
    };

    // Note: the backend state reconciler will handle the partial updates for us
    const updatedPlayerGuesses: FishbowlAllPlayerGuesses = {
      [maybeNewGuessDetails.player.playerId]: {
        [maybeNewGuessDetails.roundNumber]: updatedRoundGuesses
      }
    };

    dispatch(
      updateFishbowlGameState(
        { playerGuesses: updatedPlayerGuesses },
        maybeNewGuessDetails.player
      )
    );

    setGuess("");
  };

  return (
    <Flex align="center" gap="2">
      <TextField
        onChange={(value) => setGuess(value)}
        style={{ width: "50vw" }}
        value={guess}
      />
      <Button onClick={onGuess}>Guess</Button>
    </Flex>
  );
};
