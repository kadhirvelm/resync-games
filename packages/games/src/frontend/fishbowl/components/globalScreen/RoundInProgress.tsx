import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { FishbowlTimer } from "../timer/FishbowlTimer";
import { PlayerIcon } from "@/components/player/PlayerIcon";
import styles from "./RoundInProgress.module.scss";

export const RoundInProgress = () => {
  const activeRound = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round
  );
  if (activeRound === undefined) {
    return;
  }

  return (
    <Flex align="center" flex="1" gap="9" justify="center">
      <Flex direction="column" gap="3">
        <Flex align="center" className={styles.activePlayer} gap="5" p="5">
          <PlayerIcon
            dimension={100}
            name={activeRound.currentActivePlayer.player.displayName}
          />
          <DisplayText size="9" weight="bold">
            {activeRound.currentActivePlayer.player.displayName}
          </DisplayText>
        </Flex>
        <Flex align="center" gap="4">
          <DisplayText size="7" weight="bold">
            Round {activeRound.roundNumber}
          </DisplayText>
          <DisplayText size="7">
            {activeRound.remainingWords.length} word
            {activeRound.remainingWords.length === 1 ? "" : "s"} to go
          </DisplayText>
        </Flex>
      </Flex>
      <FishbowlTimer size={250} timer={activeRound.currentActivePlayer.timer} />
    </Flex>
  );
};
