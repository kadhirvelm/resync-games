import { ArrowRightIcon, RocketIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  OwnedStock,
  TransactionHistory
} from "../../../../backend/theStockTimes/theStockTimes";
import { Button, Flex, Text, TextField } from "../../../components";
import { selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import styles from "./PurchaseStock.module.scss";

export const PurchaseStock = ({
  viewingStockSymbol
}: {
  viewingStockSymbol: string;
}) => {
  const dispatch = useGameStateDispatch();

  const player = useGameStateSelector((s) => s.playerSlice.player);
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);
  const stocks = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );

  const [totalPurchase, setTotalPurchase] = useState("0");
  const quantity = Math.round(Number(totalPurchase));

  const currentStockPrice =
    stocks?.[viewingStockSymbol]?.history[0]?.price ?? 0;
  const totalCost = Math.round(currentStockPrice * quantity * 100) / 100;
  const currentCash = playerPortfolio?.cash ?? 0;
  const leftOverCash = currentCash - totalCost;

  const purchaseStock = () => {
    if (
      playerPortfolio === undefined ||
      player === undefined ||
      currentStockPrice === undefined
    ) {
      return;
    }

    const newOwnedStock: OwnedStock = {
      date: new Date().toISOString(),
      price: currentStockPrice,
      quantity
    };
    const newTransaction: TransactionHistory = {
      date: new Date().toISOString(),
      price: currentStockPrice,
      quantity,
      stockSymbol: viewingStockSymbol,
      type: "buy"
    };

    dispatch(
      updateTheStockTimesGameState(
        {
          players: {
            [player.playerId]: {
              cash: leftOverCash,
              lastUpdatedAt: new Date().toISOString(),
              ownedStocks: {
                ...playerPortfolio.ownedStocks,
                [viewingStockSymbol]: [
                  ...(playerPortfolio.ownedStocks[viewingStockSymbol] ?? []),
                  newOwnedStock
                ]
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

    setTotalPurchase("0");
  };

  const maxOutBuy = () => {
    const totalCanBuy = Math.floor(currentCash / currentStockPrice);
    setTotalPurchase(totalCanBuy.toString());
  };

  return (
    <Flex className={styles.purchase} justify="between" p="5">
      <Flex align="center" gap="2" wrap="wrap">
        <Text>Buy</Text>
        <Flex gap="1">
          <TextField
            onChange={setTotalPurchase}
            type="number"
            value={totalPurchase}
          />
          <Button onClick={maxOutBuy} variant="outline">
            <RocketIcon />
          </Button>
        </Flex>
        <Text>{viewingStockSymbol}</Text>
        <Text>at</Text>
        <Text color="green">{displayDollar(currentStockPrice)}</Text>
        <Text>=</Text>
        <Text color="red">{displayDollar(totalCost)}</Text>
        <Text color="gray" size="2">
          (cost)
        </Text>
        <ArrowRightIcon />
        <Text color={leftOverCash > 0 ? "green" : "red"}>
          {displayDollar(leftOverCash)}
        </Text>
        <Text color="gray" size="2">
          (cash left)
        </Text>
      </Flex>
      <Flex style={{ width: "20%" }}>
        <Button
          disabled={quantity <= 0 || leftOverCash < 0}
          onClick={purchaseStock}
        >
          Buy {quantity} stocks
        </Button>
      </Flex>
    </Flex>
  );
};
