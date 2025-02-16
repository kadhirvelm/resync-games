import { ArrowRightIcon, RocketIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  OwnedStock,
  TransactionHistory
} from "../../../../backend/theStockTimes/theStockTimes";
import { Button, Flex, Progress, Text, TextField } from "../../../components";
import { selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../store/theStockTimesRedux";
import { displayDollar } from "../../utils/displayDollar";
import styles from "./PurchaseStock.module.scss";
import { ActivateStorePower } from "../store/ActivateStorePower";
import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { useCashSpendLock } from "../../hooks/cashSpendLock";

export const LOCK_UP_TIME = 2;
export const DISCOUNT_BUY_COOLDOWN = 1.5;

export const PurchaseStock = ({
  viewingStockSymbol
}: {
  viewingStockSymbol: string;
}) => {
  const dispatch = useStockTimesGameStateDispatch();

  const { isAvailable, timeLeft } = useCashSpendLock();

  const player = useStockTimesSelector((s) => s.playerSlice.player);
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);
  const stocks = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.stocks
  );
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);

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
      currentStockPrice === undefined ||
      cycle === undefined
    ) {
      return;
    }

    const lockedAt = cycleTime(cycle).currentTime;

    const newOwnedStock: OwnedStock = {
      date: new Date().toISOString(),
      price: currentStockPrice,
      quantity
    };
    const newTransaction: TransactionHistory = {
      clockTime: lockedAt,
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
              ...playerPortfolio,
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

  const areThereEnoughLockUpDays = () => {
    if (cycle === undefined) {
      return false;
    }

    const availabilityTime = (cycle.dayTime + cycle.nightTime) * LOCK_UP_TIME;
    const dateAtCompletion = new Date(Date.now() + availabilityTime);

    const { day } = cycleTime(cycle, dateAtCompletion.valueOf());
    return day < cycle.endDay;
  };

  const purchaseDiscountStock = () => {
    if (
      playerPortfolio === undefined ||
      player === undefined ||
      currentStockPrice === undefined ||
      cycle === undefined ||
      !areThereEnoughLockUpDays()
    ) {
      return;
    }

    const availabilityTime = (cycle.dayTime + cycle.nightTime) * LOCK_UP_TIME;
    const lockedAt = cycleTime(cycle).currentTime;

    const newOwnedStockOne: OwnedStock = {
      date: new Date().toISOString(),
      lockedUntil: {
        availabilityTime,
        lockedAt
      },
      price: currentStockPrice,
      quantity
    };
    const newTransactionOne: TransactionHistory = {
      clockTime: lockedAt,
      date: new Date().toISOString(),
      price: currentStockPrice,
      quantity,
      stockSymbol: viewingStockSymbol,
      type: "buy"
    };

    const newOwnedStockTwo: OwnedStock = {
      date: new Date().toISOString(),
      lockedUntil: {
        availabilityTime,
        lockedAt
      },
      price: currentStockPrice,
      quantity
    };
    const newTransactionTwo: TransactionHistory = {
      clockTime: lockedAt,
      date: new Date().toISOString(),
      price: currentStockPrice,
      quantity,
      stockSymbol: viewingStockSymbol,
      type: "buy"
    };

    const discountBuyCooldown =
      (cycle.dayTime + cycle.nightTime) * DISCOUNT_BUY_COOLDOWN;
    const usedAt = cycleTime(cycle).currentTime;

    dispatch(
      updateTheStockTimesGameState(
        {
          players: {
            [player.playerId]: {
              ...playerPortfolio,
              cash: leftOverCash,
              lastUpdatedAt: new Date().toISOString(),
              ownedStocks: {
                ...playerPortfolio.ownedStocks,
                [viewingStockSymbol]: [
                  ...(playerPortfolio.ownedStocks[viewingStockSymbol] ?? []),
                  newOwnedStockOne,
                  newOwnedStockTwo
                ]
              },
              storePowers: {
                ...playerPortfolio.storePowers,
                discountBuy: {
                  cooldownTime: discountBuyCooldown,
                  usedAt
                }
              },
              transactionHistory: [
                ...playerPortfolio.transactionHistory,
                newTransactionOne,
                newTransactionTwo
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

  const halfBuy = () => {
    const halfBuyStock = Math.floor(currentCash / currentStockPrice) / 2;
    setTotalPurchase(halfBuyStock.toString());
  };

  const maybeRenderBuy = () => {
    if (!isAvailable) {
      return (
        <Flex align="center" flex="1" gap="2">
          <Text color="gray">Locked</Text>
          <Progress color="red" value={timeLeft} />
        </Flex>
      );
    }

    return (
      <Flex direction="column" flex="1" gap="2">
        <Button
          disabled={quantity <= 0 || leftOverCash < 0}
          onClick={purchaseStock}
        >
          Buy {quantity} stocks
        </Button>
        <ActivateStorePower
          disabled={
            quantity <= 0 || leftOverCash < 0 || !areThereEnoughLockUpDays()
          }
          onClick={purchaseDiscountStock}
          storePower="discountBuy"
          text={`Buy ${quantity * 2} stocks with lock`}
        />
      </Flex>
    );
  };

  return (
    <Flex className={styles.purchase} direction="column">
      <Flex align="center" gap="2" pt="4" px="4" wrap="wrap">
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
          <Button onClick={halfBuy} variant="outline">
            0.5
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
      <Flex flex="1" justify="end" p="2">
        <Flex style={{ width: "60%" }}>{maybeRenderBuy()}</Flex>
      </Flex>
    </Flex>
  );
};
