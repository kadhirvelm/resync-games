import { useContext } from "react";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { PlayerContext } from "@/components/player/PlayerContext";
import { Flex, Text } from "../../components";
import styles from "./PlayerPortfolio.module.scss";
import { selectTeams } from "../store/selectors";

export const PlayerPortfolio = () => {
  const player = useContext(PlayerContext);
  const playerPortfolio = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.players[player.playerId]
  );
  const stocks = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );

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
            <Text>{player.displayName}</Text>
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
              ${playerTeam?.teamCash?.toLocaleString()}
            </Text>
          </Flex>
        </Flex>
      </>
    );
  };

  const renderYourPortfolio = () => {
    return (
      <>
        <Flex mt="2">
          <Text color="gray" size="2">
            Your portfolio
          </Text>
        </Flex>
        <Flex align="center" gap="3">
          <Flex>
            <Text>Cash</Text>
          </Flex>
          <Flex className={styles.divider} flex="1" />
          <Flex>
            <Text className={styles.cash} weight="bold">
              ${playerPortfolio.cash.toLocaleString()}
            </Text>
          </Flex>
        </Flex>
      </>
    );
  };

  const renderYourStocks = () => {
    const playerStocks = Object.entries(playerPortfolio.ownedStocks);

    return (
      <>
        {playerStocks.map(([symbol, quantity]) => {
          const stock = stocks?.[symbol];
          return (
            <Flex direction="column" key={symbol}>
              <Flex>
                <Text>
                  {stock?.title} ({symbol})
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                {quantity.map(({ price, quantity }, index) => (
                  <Flex key={`${symbol}-${index}`}>
                    <Flex>
                      <Text>{quantity}</Text>
                    </Flex>
                    <Flex>
                      <Text color="gray" size="2">
                        bought at
                      </Text>
                      <Text>${price}</Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          );
        })}
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
      {renderYourPortfolio()}
      {renderYourStocks()}
    </Flex>
  );
};