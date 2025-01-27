import { ScrollArea } from "@radix-ui/themes";
import { Flex } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { Clock } from "./components/cycle/Clock";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { DayArticles } from "./components/DayArticles";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import styles from "./DesktopGame.module.scss";
import { TheStockTimesGame } from "../../backend/theStockTimes/theStockTimes";

export const DesktopGame = ({
  gameState
}: {
  gameState: TheStockTimesGame;
}) => {
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
