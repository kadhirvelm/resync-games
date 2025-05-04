import { Flex } from "@/lib/radix";
import { TheStockTimesGame } from "../../backend/theStockTimes/theStockTimes";
import { Clock } from "./components/cycle/Clock";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import { FocusedStock } from "./components/singleStock/FocusedStock";
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
        <Flex direction="column" flex="1" gap="5" ml="2" mr="7">
          <Flex flex="1">
            <FocusedStock />
          </Flex>
          <Flex flex="1">
            <FinalScoreboard />
          </Flex>
        </Flex>
      </Flex>
    </DisplayType.Provider>
  );
};
