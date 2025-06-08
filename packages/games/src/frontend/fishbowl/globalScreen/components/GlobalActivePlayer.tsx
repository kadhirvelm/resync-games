import { EarIcon } from "lucide-react";
import { DisplayText, Flex } from "../../../../../lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import {
  selectCurrentWordContribution,
  selectNextPlayer,
  selectPreviousWord
} from "../selectors/globalScreenSelectors";
import { FishbowlTimer } from "../../playerComponents/timer/FishbowlTimer";
import { ActivePlayerTracker } from "./ActivePlayerTracker";
import { PlayerIcon } from "@/components/player/PlayerIcon";

export const GlobalActivePlayer = () => {
  const activeRound = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round
  );
  const wordCount = useFishbowlSelector(selectCurrentWordContribution);
  const previousGuess = useFishbowlSelector(selectPreviousWord);
  const nextPlayer = useFishbowlSelector(selectNextPlayer);

  if (activeRound === undefined) {
    return;
  }

  const displayWordsToGo = () => {
    const wordsToGo = activeRound.remainingWords.length + 1;

    if (wordsToGo === 0) {
      return "Last word";
    }

    return `${wordsToGo} / ${wordCount?.currentWordCount ?? 0} word${wordsToGo === 1 ? "" : "s"} to go`;
  };

  const maybeRenderPreviousGuess = () => {
    if (previousGuess === undefined) {
      return;
    }

    const byPlayer = (() => {
      if (previousGuess.someoneGotIt) {
        return <EarIcon size={30} style={{ marginTop: "5px" }} />;
      }

      return `${previousGuess.player}`;
    })();

    return (
      <Flex align="center" gap="4">
        <DisplayText size="7" weight="bold">
          Previous
        </DisplayText>
        <DisplayText size="7">{previousGuess?.word}</DisplayText>
        <DisplayText size="7">{byPlayer}</DisplayText>
      </Flex>
    );
  };

  const maybeRenderNextPlayer = () => {
    if (nextPlayer === undefined) {
      return;
    }

    return (
      <Flex align="center" gap="4">
        <DisplayText size="7" weight="bold">
          Next
        </DisplayText>
        <Flex align="center" gap="2">
          <PlayerIcon dimension={35} player={nextPlayer} />
          <DisplayText size="7">{nextPlayer.displayName}</DisplayText>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex direction="column" flex="1">
      <Flex align="center" direction="column" flex="1" gap="3" justify="center">
        <ActivePlayerTracker />
        <Flex align="center" gap="4">
          <DisplayText size="7" weight="bold">
            Round {activeRound.roundNumber}
          </DisplayText>
          <DisplayText size="7">{displayWordsToGo()}</DisplayText>
        </Flex>
        {maybeRenderPreviousGuess()}
        {maybeRenderNextPlayer()}
      </Flex>
      <Flex align="center" flex="1" justify="center">
        <FishbowlTimer
          size={250}
          timer={activeRound.currentActivePlayer.timer}
        />
      </Flex>
    </Flex>
  );
};
