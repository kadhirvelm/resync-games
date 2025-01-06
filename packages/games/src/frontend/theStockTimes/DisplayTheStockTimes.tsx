import { ScrollArea } from "@radix-ui/themes";
import { Flex, Text } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { Clock } from "./components/cycle/Clock";
import { DayArticles } from "./components/DayArticles";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import styles from "./DisplayTheStockTimes.module.scss";
import { useGameStateSelector } from "./store/theStockTimesRedux";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { usePendingPlayerChanges } from "./hooks/pendingPlayerChanges";

export const DisplayTheStockTimes = () => {
  usePendingPlayerChanges();

  const gameInfo = useGameStateSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  if (gameInfo?.currentGameState === "finished") {
    return <FinalScoreboard />;
  }

  if (gameState === undefined) {
    return;
  }

  if (gameState.cycle.state === "paused") {
    return (
      <Flex align="center" flex="1" gap="3" justify="center">
        <Text color="gray">The game is paused</Text>
        <Flex>
          <PauseAndPlay />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex className={styles.mainContainer} flex="1">
      <Flex
        align="center"
        className={styles.clock}
        direction="column"
        flex="1"
        gap="2"
      >
        <Clock cycle={gameState.cycle} />
        <PauseAndPlay />
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
