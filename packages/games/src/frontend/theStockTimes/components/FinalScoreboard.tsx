import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import clsx from "clsx";
import { motion } from "motion/react";
import Confetti from "react-confetti";
import { Flex, Text } from "../../components";
import { selectTotalTeamValue } from "../store/selectors";
import { useStockTimesSelector } from "../store/theStockTimesRedux";
import { displayDollar } from "../utils/displayDollar";
import styles from "./FinalScoreboard.module.scss";

export const FinalScoreboard = () => {
  const currentGameState = useStockTimesSelector(
    (s) => s.gameStateSlice.gameInfo?.currentGameState
  );
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const teams = useStockTimesSelector(selectTotalTeamValue);
  const players = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.players
  );

  // When the last day's articles come out, this should trigger
  const isLastDayOfTrading = (() => {
    if (cycle === undefined) {
      return false;
    }

    const { day } = cycleTime(cycle);
    return day === cycle.endDay - 1;
  })();

  const hasGameEnded = currentGameState === "finished";

  if (isLastDayOfTrading) {
    return (
      <Flex direction="column" flex="1" gap="3" px="5">
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
    <Flex direction="column" flex="1" gap="3" px="5">
      {hasGameEnded && (
        <Confetti
          gravity={0.025}
          height={window.innerHeight}
          initialVelocityY={15}
          style={{ zIndex: 0 }}
          width={window.innerWidth}
        />
      )}
      {teams.map((team, index) => {
        const mappedPlayers =
          team.players?.map((p) => ({ ...p, ...players?.[p.playerId] })) ?? [];
        const sortedPlayers = mappedPlayers.sort((a, b) =>
          (a.cash ?? 0) > (b.cash ?? 0) ? -1 : 1
        );

        return (
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
                <Text size="6">{index + 1})</Text>
                <Text size="6">{team.teamName}</Text>
                <Flex className={styles.divider} flex="1" mx="2" />
                <Text size="6">{displayDollar(team.averageTeamValue)}</Text>
              </Flex>
              <Flex direction="column" gap="2">
                {sortedPlayers.map((player) => (
                  <Flex
                    align="center"
                    gap="1"
                    key={player.playerId + player.cash}
                  >
                    <Text>{player.displayName} - </Text>
                    <Text>{displayDollar(player.cash ?? 0)}</Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </motion.div>
        );
      })}
    </Flex>
  );
};
