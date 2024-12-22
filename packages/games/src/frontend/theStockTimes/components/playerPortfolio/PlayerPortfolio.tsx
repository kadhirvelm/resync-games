import { Flex, Text } from "../../../components";
import { selectPlayerPortfolio, selectTeams } from "../../store/selectors";
import { useGameStateSelector } from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import styles from "./PlayerPortfolio.module.scss";
import { PlayerStocks } from "./PlayerStocks";

export const PlayerPortfolio = () => {
  const { player } = useGameStateSelector((s) => s.playerSlice);
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);

  const teams = useGameStateSelector(selectTeams);
  const playerTeam = teams[playerPortfolio?.team ?? 0];

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
      <Flex mt="2">
        <Text color="gray" size="2">
          Your portfolio
        </Text>
      </Flex>
      {renderYourPortfolio()}
      <PlayerStocks />
    </Flex>
  );
};
