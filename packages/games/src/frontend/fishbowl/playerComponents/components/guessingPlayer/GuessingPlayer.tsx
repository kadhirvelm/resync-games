import { PlayerIcon } from "@/components/player/PlayerIcon";
import { Button, DisplayText, Flex } from "@/lib/radix";
import { getTeamColor } from "@/lib/stableIdentifiers/teamIdentifier";
import clsx from "clsx";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import {
  selectFishbowlPlayer,
  selectPlayerGuesses
} from "../../selectors/playerSelectors";
import styles from "./GuessingPlayer.module.scss";
import { SubmitGuess } from "./SubmitGuess";
import {
  FishbowlActivePlayer,
  FishbowlSingleGuess,
  FishbowlWord
} from "../../../../../backend";

const WaitingForPlayer = ({
  activePlayer
}: {
  activePlayer: FishbowlActivePlayer;
}) => {
  return (
    <Flex align="center" gap="2" p="5">
      <DisplayText size="5">Waiting for</DisplayText>
      <Flex
        align="center"
        className={styles.player}
        gap="2"
        p="2"
        style={{ background: getTeamColor(activePlayer.player.team) }}
      >
        <PlayerIcon dimension={25} player={activePlayer.player} />
        <DisplayText size="5">{activePlayer.player.displayName}</DisplayText>
      </Flex>
    </Flex>
  );
};

const PreviousGuesses = ({
  guesses,
  correctWord
}: {
  correctWord: FishbowlWord;
  guesses: FishbowlSingleGuess[];
}) => {
  if (guesses === undefined || guesses.length === 0) {
    return (
      <Flex align="center" flex="1" justify="center">
        <DisplayText>No guesses yet</DisplayText>
      </Flex>
    );
  }

  return guesses.map((guess) => (
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

export const GuessingPlayer = () => {
  const [showSubmitGuess, setShowSubmitGuess] = useState(false);

  const activePlayer = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer
  );
  const player = useFishbowlSelector(selectFishbowlPlayer);

  const guesses = useFishbowlSelector(selectPlayerGuesses);
  const correctWord = useFishbowlSelector(
    (state) => state.gameStateSlice.gameState?.round?.currentActiveWord
  );

  useEffect(() => {
    setShowSubmitGuess(false);
  }, [activePlayer]);

  if (activePlayer === undefined || correctWord === undefined) {
    return;
  }

  if (activePlayer.timer.state !== "running") {
    return <WaitingForPlayer activePlayer={activePlayer} />;
  }

  const isOnActiveTeam = player?.team === activePlayer.player.team;

  const maybeRenderActiveTeamText = () => {
    if (!isOnActiveTeam) {
      return;
    }

    return (
      <Flex align="center" gap="2">
        <DisplayText color="gray">
          Your team is up. Shout the answers!
        </DisplayText>
      </Flex>
    );
  };

  const submitGuess = () => {
    return (
      <>
        <SubmitGuess isOnActiveTeam={isOnActiveTeam} />
        <Flex className={styles.previousGuessContainer} direction="column">
          <PreviousGuesses
            correctWord={correctWord}
            guesses={guesses?.guesses ?? []}
          />
        </Flex>
      </>
    );
  };

  const maybeRenderSubmitGuess = () => {
    if (!isOnActiveTeam || (isOnActiveTeam && showSubmitGuess)) {
      return submitGuess();
    }

    return (
      <Flex mt="2">
        <Button onClick={() => setShowSubmitGuess(true)} variant="outline">
          <PencilIcon size={16} />
          Write guesses
        </Button>
      </Flex>
    );
  };

  return (
    <Flex direction="column" gap="2">
      {maybeRenderActiveTeamText()}
      {maybeRenderSubmitGuess()}
    </Flex>
  );
};
