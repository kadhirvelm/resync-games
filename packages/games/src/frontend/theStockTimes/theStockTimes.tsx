import clsx from "clsx";
import { Flex } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { Clock } from "./components/cycle/Clock";
import { DayArticles } from "./components/DayArticles";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import { useCycleTime } from "./hooks/cycleTime";
import { useGameStateSelector } from "./store/theStockTimesRedux";
import styles from "./TheStockTimes.module.scss";
import { FinalScoreboard } from "./components/FinalScoreboard";

export const DisplayTheStockTimes = () => {
  const gameInfo = useGameStateSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  const calculatedCycleTime = useCycleTime(gameState?.cycle);

  if (gameInfo?.currentGameState === "finished") {
    return <FinalScoreboard />;
  }

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex className={styles.mainContainer} flex="1">
      <Flex
        className={clsx(styles.background, {
          [styles.day ?? ""]: calculatedCycleTime.currentCycle === "day",
          [styles.night ?? ""]: calculatedCycleTime.currentCycle === "night"
        })}
      />
      <Flex align="center" className={styles.gameName} gap="2">
        <Clock
          calculatedCycleTime={calculatedCycleTime}
          cycle={gameState.cycle}
        />
      </Flex>
      <Flex flex="1">
        <PlayerPortfolio />
      </Flex>
      <Flex flex="1" ml="2">
        <DayArticles />
      </Flex>
      <Flex flex="2" mr="5">
        <AvailableStocks />
      </Flex>
    </Flex>
  );
};
