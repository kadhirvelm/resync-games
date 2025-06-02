import { PlayerIcon } from "@/components/player/PlayerIcon";
import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { FishbowlTimer } from "../timer/FishbowlTimer";
import styles from "./RoundInProgress.module.scss";
import { WordCelebration } from "./components/WordCelebration";
import { useAdvancePlayer } from "./hooks/useAdvancePlayer";
import { TimerState } from "./components/TimerState";
import {
  selectCurrentWordContribution,
  selectPreviousWord
} from "../../store/globalScreenSelectors";

export const RoundInProgress = () => {
  useAdvancePlayer();

  const activeRound = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round
  );
  const wordCount = useFishbowlSelector(selectCurrentWordContribution);
  const previousWord = useFishbowlSelector(selectPreviousWord);

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

  return (
    <Flex align="center" flex="1" gap="9" justify="center">
      <WordCelebration />
      <Flex direction="column" gap="3">
        <Flex align="center" gap="3">
          <Flex align="center" className={styles.activePlayer} gap="5" p="5">
            <PlayerIcon
              dimension={100}
              name={activeRound.currentActivePlayer.player.displayName}
            />
            <DisplayText size="9" weight="bold">
              {activeRound.currentActivePlayer.player.displayName}
            </DisplayText>
            <TimerState />
          </Flex>
        </Flex>
        <Flex align="center" gap="4">
          <DisplayText size="7" weight="bold">
            Round {activeRound.roundNumber}
          </DisplayText>
          <DisplayText size="7">{displayWordsToGo()}</DisplayText>
        </Flex>
        {previousWord !== undefined && (
          <Flex align="center" gap="4">
            <DisplayText size="7" weight="bold">
              Previous
            </DisplayText>
            <DisplayText size="7">{previousWord}</DisplayText>
          </Flex>
        )}
      </Flex>
      <FishbowlTimer size={250} timer={activeRound.currentActivePlayer.timer} />
    </Flex>
  );
};
