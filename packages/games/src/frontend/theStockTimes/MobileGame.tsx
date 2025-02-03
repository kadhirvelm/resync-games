import { motion } from "motion/react";
import { TheStockTimesGame } from "../../backend/theStockTimes/theStockTimes";
import { Flex, Tabs } from "../components";
import { AvailableStocks } from "./components/AvailableStocks";
import { Clock } from "./components/cycle/Clock";
import { PauseAndPlay } from "./components/cycle/PauseAndPlay";
import { DayArticles } from "./components/DayArticles";
import { PlayerPortfolio } from "./components/playerPortfolio/PlayerPortfolio";
import styles from "./MobileGame.module.scss";
import {
  updateTheStockTimesLocalState,
  useGameStateDispatch,
  useGameStateSelector
} from "./store/theStockTimesRedux";

export const MobileGame = ({ gameState }: { gameState: TheStockTimesGame }) => {
  const dispatch = useGameStateDispatch();

  const viewingTab = useGameStateSelector(
    (s) => s.localStateSlice.localState?.viewingTab
  );

  const handleTabChange = (tab: string) => () => {
    dispatch(updateTheStockTimesLocalState({ viewingTab: tab }));
  };

  return (
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
          <Tabs.Trigger onClick={handleTabChange("articles")} value="articles">
            Articles
          </Tabs.Trigger>
          <Tabs.Trigger onClick={handleTabChange("stocks")} value="stocks">
            Stocks
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
        <Tabs.Content value="articles">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            style={{ display: "flex", flex: "1" }}
          >
            <Flex flex="1" mt="2">
              <DayArticles />
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
      </Tabs.Root>
    </Flex>
  );
};
