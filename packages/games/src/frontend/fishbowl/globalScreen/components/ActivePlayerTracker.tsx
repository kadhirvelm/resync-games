import { PlayerIcon } from "@/components/player/PlayerIcon";
import { DisplayText, Flex } from "@/lib/radix";
import { getTeamColor } from "@/lib/stableIdentifiers/teamIdentifier";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import styles from "./ActivePlayerTracker.module.scss";
import { TimerState } from "./TimerState";

const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const ActivePlayerTracker = () => {
  const activeRound = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round
  );

  if (!activeRound) {
    return null;
  }

  return (
    <Flex className={styles.activePlayer} p="5">
      <Flex align="center" className={styles.content} gap="5">
        <PlayerIcon
          dimension={100}
          player={activeRound.currentActivePlayer.player}
        />
        <DisplayText size="9" weight="bold">
          {activeRound.currentActivePlayer.player.displayName}
        </DisplayText>
        <TimerState />
      </Flex>
      <Flex
        className={styles.background}
        style={{
          background: hexToRgba(
            getTeamColor(activeRound.currentActivePlayer.player.team ?? 0),
            0.3
          )
        }}
      />
      <Flex className={styles.whiteBackground} />
    </Flex>
  );
};
