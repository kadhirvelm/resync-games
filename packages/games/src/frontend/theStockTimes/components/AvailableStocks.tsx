import { Flex, Text } from "../../components";
import {
  updateTheStockTimesLocalState,
  useGameStateDispatch,
  useGameStateSelector
} from "../store/theStockTimesRedux";
import { displayDollar } from "../utils/displayDollar";
import styles from "./AvailableStocks.module.scss";
import { SingleStock } from "./singleStock/SingleStock";

export const AvailableStocks = () => {
  const dispatch = useGameStateDispatch();

  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);
  const viewingStockSymbol = useGameStateSelector(
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
  );
};
