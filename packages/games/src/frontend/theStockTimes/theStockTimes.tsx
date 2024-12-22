import { Flex, Text } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { PlayerPortfolio } from "./components/PlayerPortfolio";
import { useGameStateSelector } from "./store/theStockTimesRedux";
import styles from "./TheStockTimes.module.scss";

export const DisplayTheStockTimes = () => {
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex className={styles.mainContainer} flex="1">
      <Flex className={styles.gameName}>
        <Text>The stock times</Text>
      </Flex>
      <Flex flex="1">
        <PlayerPortfolio />
      </Flex>
      <Flex flex="2">
        <AvailableStocks />
      </Flex>
    </Flex>
  );
};
