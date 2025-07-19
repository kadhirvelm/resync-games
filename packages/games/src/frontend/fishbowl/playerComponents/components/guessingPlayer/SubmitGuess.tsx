import { Button, Flex, TextField } from "@/lib/radix";
import { useRef, useState } from "react";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../../store/fishbowlRedux";
import { selectNewPlayerGuess } from "../../selectors/playerSelectors";
import {
  FishbowlAllPlayerGuesses,
  FishbowlSingleGuess,
  FishbowlSinglePlayerGuesses
} from "../../../../../backend";

export const SubmitGuess = ({
  isOnActiveTeam
}: {
  isOnActiveTeam: boolean;
}) => {
  const dispatch = useFishbowlDispatch();
  const maybeNewGuessDetails = useFishbowlSelector(selectNewPlayerGuess);

  const [guess, setGuess] = useState("");
  const sanitizedGuess = guess.trim().toLowerCase();

  const textFieldRef = useRef<HTMLInputElement>(null);

  const existingGuesses =
    maybeNewGuessDetails?.currentRoundGuesses?.guesses ?? [];
  const hasPreviouslyGuessed = existingGuesses.some(
    (g) => g.guess === sanitizedGuess
  );

  const onGuess = () => {
    if (
      sanitizedGuess.length === 0 ||
      maybeNewGuessDetails === undefined ||
      maybeNewGuessDetails.player === undefined ||
      maybeNewGuessDetails.currentActiveWord === undefined ||
      hasPreviouslyGuessed
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
    textFieldRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    onGuess();
    e.preventDefault();
  };

  return (
    <Flex align="center" gap="2">
      <TextField
        autoCorrect="on"
        onChange={(value) => setGuess(value)}
        onKeyDown={onKeyDown}
        ref={textFieldRef}
        spellCheck="true"
        style={{ width: "50vw" }}
        value={guess}
      />
      <Button
        color={isOnActiveTeam ? "green" : undefined}
        disabled={hasPreviouslyGuessed}
        onClick={onGuess}
      >
        Guess
      </Button>
    </Flex>
  );
};
