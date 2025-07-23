import { DisplayPlayer } from "@/components/player/DisplayPlayer";
import { DisplayText } from "@/lib/radix";
import { Flex } from "@/lib/radix/Flex";
import { getTeamColor } from "@/lib/stableIdentifiers/teamIdentifier";
import { useGameStateSelector } from "@/redux";
import styles from "../GameLobby.module.scss";
import { ResyncTeamConfiguration } from "../../../imports/games";

export const DisplayUndecided = ({
  type
}: {
  type?: ResyncTeamConfiguration;
}) => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);

  const playersToDisplay = (() => {
    if (type === "no-teams") {
      return gameInfo?.players ?? [];
    }

    return gameInfo?.players.filter((p) => p.team === 0) ?? [];
  })();

  if (playersToDisplay.length === 0) {
    return;
  }

  return (
    <Flex direction="column">
      {type !== "no-teams" && (
        <DisplayText color="gray" mb="1" size="2">
          Undecided
        </DisplayText>
      )}
      <Flex
        className={styles.players}
        gap="3"
        style={{ background: getTeamColor(0) }}
      >
        {playersToDisplay.map((p) => (
          <Flex justify="center" key={p.playerId}>
            <DisplayPlayer key={p.playerId} player={p} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
