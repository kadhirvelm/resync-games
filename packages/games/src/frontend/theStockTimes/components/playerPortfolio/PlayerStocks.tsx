import { motion } from "motion/react";
import { Flex, Text } from "../../../components";
import { selectPlayerPortfolio } from "../../store/selectors";
import { useStockTimesSelector } from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import styles from "./PlayerStocks.module.scss";
import { SellPlayerStock } from "./SellPlayerStock";

export const PlayerStocks = () => {
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);
  const stocks = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );
  const stockOrder = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.stockInFocus.stockOrder
  );

  if (playerPortfolio === undefined) {
    return;
  }

  const playerStocksSorted = Object.keys(playerPortfolio.ownedStocks)
    .slice()
    .sort();

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

        const stockIndex = (stockOrder ?? []).indexOf(symbol);

        return (
          <Flex direction="column" key={symbol}>
            <Flex align="center" className={styles.stockSymbol} gap="3">
              <Text>
                {symbol} ({stockIndex + 1} / {stockOrder?.length})
              </Text>
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
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    key={`${symbol}-${index}`}
                    style={{ display: "flex", flex: "1" }}
                  >
                    <Flex
                      className={styles.holding}
                      direction="column"
                      flex="1"
                      gap="1"
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
                        <Text
                          color={totalProfit > 0 ? "green" : "red"}
                          size="4"
                        >
                          {displayDollar(totalProfit)}
                        </Text>
                        <Text color="gray" size="2">
                          (profit)
                        </Text>
                      </Flex>
                    </Flex>
                  </motion.div>
                );
              })}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
