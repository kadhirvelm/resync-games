import { TheStockTimesGame } from "../../backend/theStockTimes/theStockTimes";
import { Flex } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { Clock } from "./components/cycle/Clock";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import styles from "./DesktopGame.module.scss";
import { DisplayType } from "./utils/DisplayType";

export const DesktopGame = ({
  gameState
}: {
  gameState: TheStockTimesGame;
}) => {
  return (
    <DisplayType.Provider value={{ displayType: "desktop" }}>
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
          <AvailableStocks />
        </Flex>
        <Flex flex="2" mr="5">
          <FinalScoreboard />
        </Flex>
      </Flex>
    </DisplayType.Provider>
  );
};
