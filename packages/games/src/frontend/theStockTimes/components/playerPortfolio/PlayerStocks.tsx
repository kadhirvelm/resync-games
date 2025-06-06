import { motion } from "motion/react";
import { Flex, DisplayText } from "@/lib/radix";
import {
  selectFocusedStock,
  selectPlayerPortfolio
} from "../../store/selectors";
import { useStockTimesSelector } from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import styles from "./PlayerStocks.module.scss";
import { SellPlayerStock } from "./SellPlayerStock";
import clsx from "clsx";

export const PlayerStocks = () => {
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);
  const stocks = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );
  const stockOrder = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.stockInFocus.stockOrder
  );
  const focusedStock = useStockTimesSelector(selectFocusedStock);

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
              <DisplayText>
                {symbol} ({stockIndex + 1} / {stockOrder?.length})
              </DisplayText>
              <Flex className={styles.divider} flex="1" />
              <DisplayText color="green">
                {displayDollar(totalPrice)}
              </DisplayText>
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
                      className={clsx(styles.holding, {
                        [styles.active ?? ""]: focusedStock === symbol
                      })}
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
                            <DisplayText>
                              {quantity.toLocaleString()}
                            </DisplayText>
                          </Flex>
                          <DisplayText color="gray" size="2">
                            at
                          </DisplayText>
                          <DisplayText color="green">
                            {displayDollar(price)}
                          </DisplayText>
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
                        <DisplayText color="green">
                          {displayDollar(revenue)}
                        </DisplayText>
                        <DisplayText color="gray" size="2">
                          (revenue)
                        </DisplayText>
                        <DisplayText>-</DisplayText>
                        <DisplayText color="red">
                          {displayDollar(costBasis)}
                        </DisplayText>
                        <DisplayText color="gray" size="2">
                          (cost basis)
                        </DisplayText>
                      </Flex>
                      <Flex align="center" gap="1" px="2" py="1" wrap="wrap">
                        <DisplayText>=</DisplayText>
                        <DisplayText
                          color={totalProfit > 0 ? "green" : "red"}
                          size="4"
                        >
                          {displayDollar(totalProfit)}
                        </DisplayText>
                        <DisplayText color="gray" size="2">
                          (profit)
                        </DisplayText>
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
