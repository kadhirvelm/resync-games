import clsx from "clsx";
import { Flex, Text } from "../../components";
import { selectTotalTeamValue } from "../store/selectors";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { displayDollar } from "../utils/displayDollar";
import styles from "./FinalScoreboard.module.scss";
import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { motion } from "motion/react";

export const FinalScoreboard = () => {
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);
  const teams = useGameStateSelector(selectTotalTeamValue);

  // When the last day's articles come out, this should trigger
  const isLastDay = (() => {
    if (cycle === undefined) {
      return false;
    }

    const { day } = cycleTime(cycle);
    return day === cycle.endDay - 1;
  })();

  if (isLastDay) {
    return (
      <Flex direction="column" flex="1" gap="3" justify="center" px="5">
        <Flex
          align="center"
          className={styles.teamContainer}
          justify="center"
          py="4"
        >
          <Text color="gray">Last day of trading!</Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" flex="1" gap="3" justify="center" px="5">
      <Flex justify="center" mb="5">
        <Text size="9">Final scoreboard</Text>
      </Flex>
      {teams.map((team, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          key={team.teamName ?? index}
          layout="position"
          transition={{ delay: (teams.length - index) * 1 }}
        >
          <Flex
            className={clsx(styles.teamContainer, {
              [styles.gold ?? ""]: index === 0
            })}
            direction="column"
            gap="2"
            p="3"
          >
            <Flex align="center" gap="2">
              <Text size="8">{index + 1})</Text>
              <Text size="8">{team.teamName}</Text>
              <Flex className={styles.divider} flex="1" mx="2" />
              <Text size="8">{displayDollar(team.averageTeamValue)}</Text>
            </Flex>
            <Flex>{team.players?.map((p) => p.displayName).join(", ")}</Flex>
          </Flex>
        </motion.div>
      ))}
    </Flex>
  );
};
