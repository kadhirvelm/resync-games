import { cycleTime } from "@/imports/games-shared";
import {
  OwnedStock,
  TransactionHistory
} from "../../../../backend/theStockTimes/theStockTimes";
import { Button, Flex, Progress, DisplayText } from "@/lib/radix";
import { useStockLock } from "../../hooks/stockLock";
import { selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../store/theStockTimesRedux";
import { ActivateStorePower } from "../store/ActivateStorePower";

export const SELL_INTO_GAIN_COOLDOWN = 1.5;

export const SellPlayerStock = ({
  atLoss,
  currentPrice,
  ownedStock,
  symbol
}: {
  atLoss: boolean;
  currentPrice: number;
  ownedStock: OwnedStock;
  symbol: string;
}) => {
  const dispatch = useStockTimesGameStateDispatch();

  const player = useStockTimesSelector((s) => s.playerSlice.player);
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);

  const { isAvailable, timeLeft } = useStockLock(ownedStock, symbol);

  const removeStock = () => {
    if (playerPortfolio === undefined) {
      return [];
    }

    const newOwnedStock = (playerPortfolio.ownedStocks[symbol] ?? []).slice();

    const firstMatchingStock =
      newOwnedStock.findIndex(
        (stock) =>
          stock.date === ownedStock.date &&
          stock.quantity === ownedStock.quantity &&
          stock.price === ownedStock.price
      ) ?? 0;
    newOwnedStock.splice(firstMatchingStock, 1);

    return newOwnedStock;
  };

  const onSell = () => {
    if (
      player === undefined ||
      playerPortfolio === undefined ||
      cycle === undefined
    ) {
      return;
    }

    const newCash = playerPortfolio.cash + currentPrice * ownedStock.quantity;

    const usedAt = cycleTime(cycle).currentTime;

    const newTransaction: TransactionHistory = {
      clockTime: usedAt,
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
              ...playerPortfolio,
              cash: newCash,
              lastUpdatedAt: new Date().toISOString(),
              ownedStocks: {
                ...playerPortfolio.ownedStocks,
                [symbol]: removeStock()
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

  const onConvertToGain = () => {
    if (
      cycle === undefined ||
      player === undefined ||
      playerPortfolio === undefined
    ) {
      return;
    }

    const lossIntoGainCooldown =
      (cycle.dayTime + cycle.nightTime) * SELL_INTO_GAIN_COOLDOWN;
    const usedAt = cycleTime(cycle).currentTime;

    const newPrice = (ownedStock.price - currentPrice) * 2 + currentPrice;
    const newCash = playerPortfolio.cash + newPrice * ownedStock.quantity;

    const newTransaction: TransactionHistory = {
      clockTime: usedAt,
      date: new Date().toISOString(),
      lossIntoGain: true,
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
              ...playerPortfolio,
              cash: newCash,
              lastUpdatedAt: new Date().toISOString(),
              ownedStocks: {
                ...playerPortfolio.ownedStocks,
                [symbol]: removeStock()
              },
              storePowers: {
                ...playerPortfolio.storePowers,
                lossIntoGain: {
                  cooldownTime: lossIntoGainCooldown,
                  usedAt
                }
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

  if (!isAvailable) {
    return (
      <Flex align="center" flex="1" gap="2">
        <DisplayText color="gray">Locked</DisplayText>
        <Progress color="red" value={timeLeft} />
      </Flex>
    );
  }

  return (
    <Flex direction="column" flex="1" gap="2">
      <Button color={atLoss ? "red" : "green"} onClick={onSell}>
        Sell
      </Button>
      {/* TODO: make this more obvious and clear it up */}
      {atLoss && (
        <ActivateStorePower
          onClick={onConvertToGain}
          storePower="lossIntoGain"
          text="Convert to gain"
        />
      )}
    </Flex>
  );
};
