import { selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import { Button, Flex, Text } from "../../../components";
import { displayDollar } from "../../utils/displayDollar";
import styles from "./PlayerStocks.module.scss";
import {
  OwnedStock,
  TransactionHistory
} from "../../../../backend/theStockTimes/theStockTimes";

const SellPlayerStock = ({
  currentPrice,
  ownedStock,
  symbol
}: {
  currentPrice: number;
  ownedStock: OwnedStock;
  symbol: string;
}) => {
  const dispatch = useGameStateDispatch();
  const player = useGameStateSelector((s) => s.playerSlice.player);
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);

  const onSell = () => {
    if (player === undefined || playerPortfolio === undefined) {
      return;
    }

    const newCash = playerPortfolio.cash + currentPrice * ownedStock.quantity;
    const newOwnedStock = playerPortfolio.ownedStocks[symbol]?.filter(
      (stock) => stock.date !== ownedStock.date
    );

    const newTransaction: TransactionHistory = {
      date: new Date().toISOString(),
      price: currentPrice,
      quantity: ownedStock.quantity,
      stockSymbol: symbol,
      type: "sell"
    };

    dispatch(
      updateTheStockTimesGameState(
        {
          players: {
            [player.playerId]: {
              cash: newCash,
              lastUpdatedAt: new Date().toISOString(),
              ownedStocks: {
                ...playerPortfolio.ownedStocks,
                [symbol]: newOwnedStock
              },
              transactionHistory: [
                ...playerPortfolio.transactionHistory,
                newTransaction
              ]
            }
          }
        },
        player
      )
    );
  };

  return (
    <Button color="red" onClick={onSell}>
      Sell
    </Button>
  );
};

export const PlayerStocks = () => {
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

  return playerStocksSorted.map((symbol) => {
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
      .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());

    return (
      <Flex direction="column" key={symbol}>
        <Flex align="center" gap="3">
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
                  <SellPlayerStock
                    currentPrice={currentPrice}
                    ownedStock={ownedStock}
                    symbol={symbol}
                  />
                </Flex>
                <Flex align="end" direction="column" gap="1" px="2" py="1">
                  <Flex align="center" gap="1">
                    <Text color="green">{displayDollar(revenue)}</Text>
                    <Text color="gray" size="2">
                      (revenue)
                    </Text>
                  </Flex>
                  <Flex align="center" className={styles.equals} gap="1">
                    <Text color="red">-{displayDollar(costBasis)}</Text>
                    <Text color="gray" size="2">
                      (cost basis)
                    </Text>
                  </Flex>
                  <Flex align="center" gap="1" mt="1">
                    <Text color="gray" size="2">
                      (profit)
                    </Text>
                    <Text>=</Text>
                    <Text color={totalProfit > 0 ? "green" : "red"} size="4">
                      {displayDollar(totalProfit)}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    );
  });
};
