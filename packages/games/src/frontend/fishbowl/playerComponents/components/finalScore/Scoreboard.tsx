import { PlayerIcon } from "@/components/player/PlayerIcon";
import { getTeamColor } from "@/lib/stableIdentifiers/teamIdentifier";
import { motion } from "motion/react";
import { DisplayText, Flex } from "../../../../../../lib/radix";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import { finalScoreSelector } from "../../../store/sharedSelectors";
import styles from "./Scoreboard.module.scss";

export const Scoreboard = () => {
  const maybeFinalScores = useFishbowlSelector(finalScoreSelector);

  if (maybeFinalScores === undefined) {
    return <Flex>Final scores not available yet.</Flex>;
  }

  const totalTeams = Object.keys(maybeFinalScores.teamEntries).length;

  return (
    <Flex direction="column" gap="5">
      {maybeFinalScores.teamEntries.map((team, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          key={team.teamName ?? index}
          layout="position"
          transition={{ delay: (totalTeams - index) * 1 }}
        >
          <Flex
            className={styles.scoreBox}
            direction="column"
            flex="1"
            gap="3"
            key={index}
            p="4"
            style={{ background: getTeamColor(team.players[0]?.team ?? 0) }}
          >
            <Flex align="center" flex="1" gap="5" justify="between" pb="4">
              <Flex gap="3">
                {index === 0 && <DisplayText size="7">👑</DisplayText>}
                <DisplayText size="7">{team.teamName}</DisplayText>
              </Flex>
              <DisplayText ml="5" size="7">
                {team.totalScore}
              </DisplayText>
            </Flex>
            <Flex gap="2" wrap="wrap">
              {team.players.map((player) => (
                <Flex align="center" gap="2" key={player.playerId}>
                  <PlayerIcon dimension={25} player={player} />
                  <DisplayText size="5">{player.displayName}</DisplayText>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </motion.div>
      ))}
    </Flex>
  );
};
