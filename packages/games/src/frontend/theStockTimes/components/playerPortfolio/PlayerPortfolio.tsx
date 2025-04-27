import { motion } from "motion/react";
import { Flex, Text } from "../../../components";
import {
  selectPlayerPortfolio,
  selectTeams,
  selectTotalTeamValue
} from "../../store/selectors";
import { useStockTimesSelector } from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import styles from "./PlayerPortfolio.module.scss";
import { PlayerStocks } from "./PlayerStocks";

export const PlayerPortfolio = () => {
  const { player } = useStockTimesSelector((s) => s.playerSlice);
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);

  const teams = useStockTimesSelector(selectTeams);
  const teamValues = useStockTimesSelector(selectTotalTeamValue);

  const playerTeam = teams[playerPortfolio?.team ?? 0];
  const playerTeamValue = teamValues[playerPortfolio?.team ?? 0];

  if (playerPortfolio === undefined) {
    return;
  }

  const renderTeamValue = () => {
    return (
      <>
        <Flex align="center" gap="3">
          <Flex>
            <Text>{player?.displayName}</Text>
          </Flex>
          <Flex className={styles.divider} flex="1" />
          <Flex>
            <Text>{playerTeam?.teamName}</Text>
          </Flex>
        </Flex>
        <Flex align="center" gap="3">
          <Flex>
            <Text>Team cash</Text>
          </Flex>
          <Flex className={styles.divider} flex="1" />
          <Flex>
            <Text className={styles.cash}>
              {displayDollar(playerTeam?.teamCash)}
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" gap="3">
          <Flex>
            <Text>Average team value</Text>
          </Flex>
          <Flex className={styles.divider} flex="1" />
          <Flex>
            <Text className={styles.cash}>
              {displayDollar(playerTeamValue?.averageTeamValue)}
            </Text>
          </Flex>
        </Flex>
      </>
    );
  };

  const renderYourPortfolio = () => {
    return (
      <>
        <Flex align="center" gap="3">
          <Flex>
            <Text>Cash</Text>
          </Flex>
          <Flex className={styles.divider} flex="1" />
          <Flex>
            <motion.span
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              initial={{ opacity: 0, rotate: 180, scale: 1.5 }}
              key={playerPortfolio.cash}
              style={{ display: "flex", flex: "1" }}
            >
              <Text className={styles.cash} weight="bold">
                {displayDollar(playerPortfolio.cash)}
              </Text>
            </motion.span>
          </Flex>
        </Flex>
        <Flex align="center" gap="3">
          <Flex>
            <Text>Debt</Text>
          </Flex>
          <Flex className={styles.divider} flex="1" />
          <Flex>
            <motion.span
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              initial={{ opacity: 0, rotate: 180, scale: 1.5 }}
              key={playerPortfolio.cash}
              style={{ display: "flex", flex: "1" }}
            >
              <Text className={styles.debt}>
                {displayDollar(playerPortfolio.debt)}
              </Text>
            </motion.span>
          </Flex>
        </Flex>
      </>
    );
  };

  return (
    <Flex
      className={styles.portfolioContainer}
      direction="column"
      flex="1"
      gap="2"
      p="3"
    >
      {renderTeamValue()}
      <Flex direction="column" flex="1" gap="2" mt="2">
        {renderYourPortfolio()}
        <PlayerStocks />
      </Flex>
    </Flex>
  );
};
