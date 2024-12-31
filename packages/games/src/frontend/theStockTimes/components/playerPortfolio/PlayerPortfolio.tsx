import { Flex, Tabs, Text } from "../../../components";
import {
  selectPlayerPortfolio,
  selectTeams,
  selectTotalTeamValue
} from "../../store/selectors";
import { useGameStateSelector } from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import { StockTimesStore } from "../store/StockTimesStore";
import styles from "./PlayerPortfolio.module.scss";
import { PlayerStocks } from "./PlayerStocks";

export const PlayerPortfolio = () => {
  const { player } = useGameStateSelector((s) => s.playerSlice);
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);

  const teams = useGameStateSelector(selectTeams);
  const teamValues = useGameStateSelector(selectTotalTeamValue);

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
            <Text className={styles.cash} weight="bold">
              {displayDollar(playerPortfolio.cash)}
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" gap="3">
          <Flex>
            <Text>Debt</Text>
          </Flex>
          <Flex className={styles.divider} flex="1" />
          <Flex>
            <Text className={styles.debt}>
              {displayDollar(playerPortfolio.debt)}
            </Text>
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
      <Tabs.Root defaultValue="your-portfolio">
        <Tabs.List>
          <Tabs.Trigger value="your-portfolio">Your portfolio</Tabs.Trigger>
          <Tabs.Trigger value="store">Store</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="your-portfolio">
          <Flex direction="column" mt="2">
            {renderYourPortfolio()}
            <PlayerStocks />
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="store">
          <Flex direction="column" mt="2">
            <StockTimesStore />
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};
