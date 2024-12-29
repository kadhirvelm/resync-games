import { ScrollArea } from "@radix-ui/themes";
import { Flex } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { Clock } from "./components/cycle/Clock";
import { DayArticles } from "./components/DayArticles";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import { useGameStateSelector } from "./store/theStockTimesRedux";
import styles from "./TheStockTimes.module.scss";

export const DisplayTheStockTimes = () => {
  const gameInfo = useGameStateSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameInfo?.currentGameState === "finished") {
    return <FinalScoreboard />;
  }

  if (gameState === undefined) {
    return;
  }

  return (
    <Flex className={styles.mainContainer} flex="1">
      <Flex align="center" className={styles.clock} gap="2">
        <Clock cycle={gameState.cycle} />
      </Flex>
      <Flex flex="1">
        <PlayerPortfolio />
      </Flex>
      <Flex flex="1" ml="2">
        <ScrollArea>
          <DayArticles />
        </ScrollArea>
      </Flex>
      <Flex flex="2" mr="5">
        <AvailableStocks />
      </Flex>
    </Flex>
  );
};
