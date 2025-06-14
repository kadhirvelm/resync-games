import { Flex, Tabs } from "@/lib/radix";
import { motion } from "motion/react";
import { TheStockTimesGame } from "../../backend/theStockTimes/theStockTimes";
import { Clock } from "./components/cycle/Clock";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import { Sabotage } from "./components/sabotage/Sabotage";
import { FocusedStock } from "./components/singleStock/FocusedStock";
import { StockTimesStore } from "./components/store/StockTimesStore";
import styles from "./StockTimesGameEntry.module.scss";
import {
  updateTheStockTimesLocalState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "./store/theStockTimesRedux";
import { DisplayType } from "./utils/DisplayType";

export const StockTimesGameEntry = ({
  isMobile,
  gameState
}: {
  gameState: TheStockTimesGame;
  isMobile: boolean;
}) => {
  const dispatch = useStockTimesGameStateDispatch();

  const viewingTab = useStockTimesSelector(
    (s) => s.localStateSlice.localState?.viewingTab
  );

  const handleTabChange = (tab: string) => () => {
    dispatch(updateTheStockTimesLocalState({ viewingTab: tab }));
  };

  return (
    <DisplayType.Provider
      value={{ displayType: isMobile ? "mobile" : "desktop" }}
    >
      <Flex className={styles.mainContainer} direction="column" flex="1">
        <Flex className={styles.clock} justify="end">
          <Flex align="center" gap="2">
            <Clock cycle={gameState.cycle} size={60} />
            <PauseAndPlay />
          </Flex>
        </Flex>
        <Tabs.Root style={{ width: "100%" }} value={viewingTab}>
          <Tabs.List style={{ maxWidth: "90vw", overflowX: "auto" }}>
            <Tabs.Trigger onClick={handleTabChange("stocks")} value="stocks">
              Buy stock
            </Tabs.Trigger>
            <Tabs.Trigger
              onClick={handleTabChange("portfolio")}
              value="portfolio"
            >
              Your portfolio
            </Tabs.Trigger>
            <Tabs.Trigger
              onClick={handleTabChange("powerups")}
              value="powerups"
            >
              Power ups
            </Tabs.Trigger>
            <Tabs.Trigger
              onClick={handleTabChange("sabotage")}
              value="sabotage"
            >
              Sabotage
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
          <Tabs.Content value="stocks">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              style={{ display: "flex", flex: "1" }}
            >
              <Flex flex="1" mt="2">
                <FocusedStock />
              </Flex>
            </motion.div>
          </Tabs.Content>
          <Tabs.Content value="powerups">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              style={{ display: "flex", flex: "1" }}
            >
              <Flex direction="column" flex="1" mt="2">
                <StockTimesStore />
              </Flex>
            </motion.div>
          </Tabs.Content>
          <Tabs.Content value="sabotage">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              style={{ display: "flex", flex: "1" }}
            >
              <Flex direction="column" flex="1" mt="2">
                <Sabotage />
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
