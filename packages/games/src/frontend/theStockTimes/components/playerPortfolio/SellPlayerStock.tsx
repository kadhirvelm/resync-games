import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import {
  OwnedStock,
  TransactionHistory
} from "../../../../backend/theStockTimes/theStockTimes";
import { Button, Flex, Progress, Text } from "../../../components";
import { selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import { ActivateStorePower } from "../store/ActivateStorePower";
import { useStockLock } from "../../hooks/stockLock";

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
  const dispatch = useGameStateDispatch();
  const player = useGameStateSelector((s) => s.playerSlice.player);
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);

  const { isAvailable, timeLeft } = useStockLock(ownedStock);

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
    if (player === undefined || playerPortfolio === undefined) {
      return;
    }

    const newCash = playerPortfolio.cash + currentPrice * ownedStock.quantity;

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

    const newPrice = (ownedStock.price - currentPrice) * 2 + currentPrice;
    const newCash = playerPortfolio.cash + newPrice * ownedStock.quantity;

    const newTransaction: TransactionHistory = {
      date: new Date().toISOString(),
      lossIntoGain: true,
      price: currentPrice,
      quantity: ownedStock.quantity,
      stockSymbol: symbol,
      type: "sell"
    };

    const lossIntoGainCooldown =
      (cycle.dayTime + cycle.nightTime) * SELL_INTO_GAIN_COOLDOWN;
    const usedAt = cycleTime(cycle).currentTime;

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
        <Text color="gray">Locked</Text>
        <Progress color="blue" value={timeLeft} />
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
