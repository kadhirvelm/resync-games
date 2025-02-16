import { Flex, Text } from "../../components";
import {
  updateTheStockTimesLocalState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../store/theStockTimesRedux";
import { displayDollar } from "../utils/displayDollar";
import styles from "./AvailableStocks.module.scss";
import { SingleStock } from "./singleStock/SingleStock";
import { motion } from "motion/react";

export const AvailableStocks = () => {
  const dispatch = useStockTimesGameStateDispatch();

  const gameState = useStockTimesSelector((s) => s.gameStateSlice.gameState);
  const viewingStockSymbol = useStockTimesSelector(
    (s) => s.localStateSlice.localState?.viewingStockSymbol
  );

  if (gameState === undefined) {
    return;
  }

  if (viewingStockSymbol !== undefined) {
    return <SingleStock viewingStockSymbol={viewingStockSymbol} />;
  }

  const setViewingStockSymbol = (stockSymbol: string) => () => {
    dispatch(
      updateTheStockTimesLocalState({ viewingStockSymbol: stockSymbol })
    );
  };

  const stocksInOrder = Object.keys(gameState.stocks).sort();

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
    >
      <Flex direction="column" flex="1" gap="3" mx="4">
        {stocksInOrder.map((stockSymbol, index) => {
          const stock = gameState.stocks[stockSymbol];
          if (stock === undefined) {
            return;
          }

          return (
            <Flex
              className={styles.singleStock}
              direction="column"
              key={stockSymbol}
              onClick={setViewingStockSymbol(stockSymbol)}
              p="3"
            >
              <Flex justify="between">
                <Text size="4" weight="bold">
                  {index + 1}) {stockSymbol} - {stock.title}
                </Text>
                <Text color="green" size="4">
                  {displayDollar(stock.history[0]?.price)}
                </Text>
              </Flex>
              <Text color="gray" mt="2" size="2">
                {stock.description}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </motion.div>
  );
};
