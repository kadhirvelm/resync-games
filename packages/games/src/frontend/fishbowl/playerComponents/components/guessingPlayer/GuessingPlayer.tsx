import { PlayerIcon } from "@/components/player/PlayerIcon";
import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import { selectPlayerGuesses } from "../../selectors/playerSelectors";
import styles from "./GuessingPlayer.module.scss";
import { SubmitGuess } from "./SubmitGuess";
import clsx from "clsx";

export const GuessingPlayer = () => {
  const activePlayer = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer
  );
  const guesses = useFishbowlSelector(selectPlayerGuesses);
  const correctWord = useFishbowlSelector(
    (state) => state.gameStateSlice.gameState?.round?.currentActiveWord
  );

  if (activePlayer === undefined) {
    return;
  }

  if (activePlayer.timer.state !== "running") {
    return (
      <Flex align="center" gap="2" p="5">
        <DisplayText size="5">Waiting for</DisplayText>
        <Flex align="center" className={styles.player} gap="2" p="2">
          <PlayerIcon dimension={25} player={activePlayer.player} />
          <DisplayText size="5">{activePlayer.player.displayName}</DisplayText>
        </Flex>
      </Flex>
    );
  }

  const maybeRenderPreviousGuesses = () => {
    if (guesses?.guesses === undefined || guesses?.guesses.length === 0) {
      return (
        <Flex align="center" flex="1" justify="center">
          <DisplayText>No guesses yet</DisplayText>
        </Flex>
      );
    }

    return guesses?.guesses.map((guess) => (
      <Flex
        align="center"
        className={clsx({
          [styles.correctGuess ?? ""]: correctWord?.word === guess.guess
        })}
        key={guess.timestamp}
        px="2"
        py="1"
      >
        <DisplayText key={guess.timestamp}>{guess.guess}</DisplayText>
      </Flex>
    ));
  };

  return (
    <Flex direction="column" gap="2">
      <SubmitGuess />
      <Flex className={styles.previousGuessContainer} direction="column">
        {maybeRenderPreviousGuesses()}
      </Flex>
    </Flex>
  );
};
