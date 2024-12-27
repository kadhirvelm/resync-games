import { Flex } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { Clock } from "./components/cycle/Clock";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import { useGameStateSelector } from "./store/theStockTimesRedux";
import styles from "./TheStockTimes.module.scss";

export const DisplayTheStockTimes = () => {
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex className={styles.mainContainer} flex="1">
      <Flex align="center" className={styles.gameName} gap="2">
        <Clock cycle={gameState.cycle} />
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
