import { Flex, Text } from "../../../components";
import { selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesLocalState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import styles from "./PlayerStocks.module.scss";
import { SellPlayerStock } from "./SellPlayerStock";

export const PlayerStocks = () => {
  const dispatch = useGameStateDispatch();

  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);
  const stocks = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );

  if (playerPortfolio === undefined) {
    return;
  }

  const playerStocksSorted = Object.keys(playerPortfolio.ownedStocks)
    .slice()
    .sort();

  const setViewingStockSymbol = (stockSymbol: string) => () => {
    dispatch(
      updateTheStockTimesLocalState({ viewingStockSymbol: stockSymbol })
    );
  };

  return (
    <Flex direction="column" gap="3">
      {playerStocksSorted.map((symbol) => {
        const ownedStock = playerPortfolio.ownedStocks[symbol];
        if (ownedStock === undefined || ownedStock.length === 0) {
          return;
        }

        const stock = stocks?.[symbol];

        const currentPrice = stock?.history[0]?.price ?? 0;
        const totalQuantity = ownedStock.reduce(
          (previous, next) => previous + next.quantity,
          0
        );
        const totalPrice = totalQuantity * currentPrice;

        const sortedQuantity = ownedStock
          .slice()
          .sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
          );

        return (
          <Flex direction="column" key={symbol}>
            <Flex
              align="center"
              className={styles.stockSymbol}
              gap="3"
              onClick={setViewingStockSymbol(symbol)}
            >
              <Text>{symbol}</Text>
              <Flex className={styles.divider} flex="1" />
              <Text color="green">{displayDollar(totalPrice)}</Text>
            </Flex>
            <Flex direction="column" gap="4" ml="3" mt="2">
              {sortedQuantity.map((ownedStock, index) => {
                const { price, quantity } = ownedStock;
                const costBasis = price * quantity;
                const revenue = currentPrice * quantity;
                const totalProfit = revenue - costBasis;

                return (
                  <Flex
                    className={styles.holding}
                    direction="column"
                    gap="1"
                    key={`${symbol}-${index}`}
                  >
                    <Flex
                      align="center"
                      className={styles.holdingAction}
                      gap="4"
                      justify="between"
                      p="2"
                    >
                      <Flex align="center" gap="2">
                        <Flex>
                          <Text>{quantity.toLocaleString()}</Text>
                        </Flex>
                        <Text color="gray" size="2">
                          at
                        </Text>
                        <Text color="green">{displayDollar(price)}</Text>
                      </Flex>
                      <Flex width="50%">
                        <SellPlayerStock
                          atLoss={totalProfit < 0}
                          currentPrice={currentPrice}
                          ownedStock={ownedStock}
                          symbol={symbol}
                        />
                      </Flex>
                    </Flex>
                    <Flex align="center" gap="1" px="2" py="1" wrap="wrap">
                      <Text color="green">{displayDollar(revenue)}</Text>
                      <Text color="gray" size="2">
                        (revenue)
                      </Text>
                      <Text>-</Text>
                      <Text color="red">{displayDollar(costBasis)}</Text>
                      <Text color="gray" size="2">
                        (cost basis)
                      </Text>
                    </Flex>
                    <Flex align="center" gap="1" px="2" py="1" wrap="wrap">
                      <Text>=</Text>
                      <Text color={totalProfit > 0 ? "green" : "red"} size="4">
                        {displayDollar(totalProfit)}
                      </Text>
                      <Text color="gray" size="2">
                        (profit)
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
