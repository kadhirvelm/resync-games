import { PlayerIcon } from "@/components/player/PlayerIcon";
import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import { TimerState } from "./TimerState";
import styles from "./ActivePlayerTracker.module.scss";

export const ActivePlayerTracker = () => {
  const activeRound = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round
  );

  if (!activeRound) {
    return null;
  }

  return (
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
  );
};
