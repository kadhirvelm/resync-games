import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { finalScoreSelector } from "../../store/sharedSelectors";
import { PlayerIcon } from "@/components/player/PlayerIcon";
import { getTeamColor } from "@/lib/stableIdentifiers/teamIdentifier";
import styles from "./FinalScore.module.scss";
import { motion } from "motion/react";
import Confetti from "react-confetti";

export const FinalScore = () => {
  const maybeFinalScores = useFishbowlSelector(finalScoreSelector);

  if (maybeFinalScores === undefined) {
    return <Flex>Final scores not available yet.</Flex>;
  }

  const totalTeams = Object.keys(maybeFinalScores.teamEntries).length;

  return (
    <Flex align="center" direction="column" flex="1" justify="center">
      <Confetti
        gravity={0.025}
        height={window.innerHeight}
        initialVelocityY={15}
        style={{ zIndex: 0 }}
        width={window.innerWidth}
      />
      <Flex direction="column" gap="9">
        {maybeFinalScores.teamEntries.map((team, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            key={index}
            layout="position"
            transition={{ delay: (totalTeams - index) * 1 }}
          >
            <Flex
              className={styles.scoreBox}
              direction="column"
              flex="1"
              gap="5"
              p="8"
              style={{ background: getTeamColor(team.players[0]?.team ?? 0) }}
            >
              <Flex align="center" flex="1" gap="5" justify="between" pb="4">
                <Flex gap="5">
                  {index === 0 && <DisplayText size="9">👑</DisplayText>}
                  <DisplayText size="9">{team.teamName}</DisplayText>
                </Flex>
                <DisplayText ml="5" size="9">
                  {team.totalScore}
                </DisplayText>
              </Flex>
              <Flex gap="2" wrap="wrap">
                {team.players.map((player) => (
                  <Flex align="center" gap="2" key={player.playerId}>
                    <PlayerIcon dimension={30} player={player} />
                    <DisplayText size="7">{player.displayName}</DisplayText>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </motion.div>
        ))}
      </Flex>
    </Flex>
  );
};
