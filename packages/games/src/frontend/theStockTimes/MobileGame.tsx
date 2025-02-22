import { motion } from "motion/react";
import { TheStockTimesGame } from "../../backend/theStockTimes/theStockTimes";
import { Flex, Tabs } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { Clock } from "./components/cycle/Clock";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import styles from "./MobileGame.module.scss";
import {
  updateTheStockTimesLocalState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "./store/theStockTimesRedux";
import { DisplayType } from "./utils/DisplayType";

export const MobileGame = ({ gameState }: { gameState: TheStockTimesGame }) => {
  const dispatch = useStockTimesGameStateDispatch();

  const viewingTab = useStockTimesSelector(
    (s) => s.localStateSlice.localState?.viewingTab
  );

  const handleTabChange = (tab: string) => () => {
    dispatch(updateTheStockTimesLocalState({ viewingTab: tab }));
  };

  return (
    <DisplayType.Provider value={{ displayType: "mobile" }}>
      <Flex className={styles.mainContainer} flex="1">
        <Flex align="center" className={styles.clock} flex="1" gap="2">
          <Clock cycle={gameState.cycle} size={60} />
          <PauseAndPlay />
        </Flex>
        <Tabs.Root style={{ width: "100%" }} value={viewingTab}>
          <Tabs.List>
            <Tabs.Trigger
              onClick={handleTabChange("portfolio")}
              value="portfolio"
            >
              Portfolio
            </Tabs.Trigger>
            <Tabs.Trigger onClick={handleTabChange("stocks")} value="stocks">
              Stocks
            </Tabs.Trigger>
            <Tabs.Trigger
              onClick={handleTabChange("scoreboard")}
              value="scoreboard"
            >
              Scoreboard
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="portfolio">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              style={{ display: "flex", flex: "1" }}
            >
              <Flex flex="1" mt="2">
                <PlayerPortfolio />
              </Flex>
            </motion.div>
          </Tabs.Content>
          <Tabs.Content style={{ height: "100%" }} value="stocks">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              style={{ display: "flex", flex: "1", height: "100%" }}
            >
              <Flex flex="1" mt="2">
                <AvailableStocks />
              </Flex>
            </motion.div>
          </Tabs.Content>
          <Tabs.Content value="scoreboard">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              style={{ display: "flex", flex: "1" }}
            >
              <Flex flex="1" mt="2">
                <FinalScoreboard />
              </Flex>
            </motion.div>
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </DisplayType.Provider>
  );
};
