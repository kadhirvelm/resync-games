import { PlayerId } from "@/imports/api";
import { cycleTime } from "@/imports/games-shared";
import { useState } from "react";
import { Flex, Select, DisplayText } from "@/lib/radix";
import {
  selectOpponents,
  selectPlayerPortfolio,
  selectStocksWithOrder
} from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../store/theStockTimesRedux";
import { ActivateStorePower } from "../store/ActivateStorePower";

export const STOCK_LOCK_DURATION = 0.75;
export const STOCK_LOCK_COOLDOWN = 1.5;

export const StockLock = () => {
  const dispatch = useStockTimesGameStateDispatch();

  const player = useStockTimesSelector((s) => s.playerSlice.player);
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const pendingPlayerActions = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.pendingPlayerActions
  );

  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);
  const opponents = useStockTimesSelector(selectOpponents);
  const stocks = useStockTimesSelector(selectStocksWithOrder);

  const [playerSelector, setPlayerSelector] = useState(opponents[0]?.playerId);
  const [stockSelector, setStockSelector] = useState(stocks[0]?.symbol);

  if (playerPortfolio === undefined || opponents.length === 0) {
    return <DisplayText color="gray">No opponents available</DisplayText>;
  }

  const lockPlayerStock = () => {
    if (
      player === undefined ||
      cycle === undefined ||
      playerSelector === undefined ||
      stockSelector === undefined ||
      pendingPlayerActions?.[playerSelector]?.stockLock !== undefined
    ) {
      return;
    }

    const totalDuration =
      (cycle.dayTime + cycle.nightTime) * STOCK_LOCK_DURATION;
    const stockLockCooldown =
      (cycle.dayTime + cycle.nightTime) * STOCK_LOCK_COOLDOWN;
    const usedAt = cycleTime(cycle).currentTime;

    dispatch(
      updateTheStockTimesGameState(
        {
          pendingPlayerActions: {
            [playerSelector]: {
              lastUpdatedAt: new Date().toISOString(),
              stockLock: {
                lock: {
                  availabilityTime: totalDuration,
                  lockedAt: usedAt
                },
                stockSymbol: stockSelector
              }
            }
          },
          players: {
            [player.playerId]: {
              ...playerPortfolio,
              lastUpdatedAt: new Date().toISOString(),
              storePowers: {
                ...playerPortfolio.storePowers,
                stockLock: {
                  cooldownTime: stockLockCooldown,
                  usedAt
                }
              }
            }
          }
        },
        player
      )
    );

    setPlayerSelector(undefined);
  };

  return (
    <Flex direction="column" flex="1" gap="2">
      <Flex align="center" gap="2">
        <DisplayText color="gray" size="2">
          Player
        </DisplayText>
        <Select<PlayerId>
          items={opponents.map((player) => ({
            label: player.displayName,
            value: player.playerId
          }))}
          onChange={setPlayerSelector}
          value={playerSelector}
        />
      </Flex>
      <Flex align="center" gap="2">
        <DisplayText color="gray" size="2">
          Stock
        </DisplayText>
        <Select
          items={stocks.map(({ title, symbol, orderIndex }) => ({
            label: `(${orderIndex}) [${symbol}] ${title}`,
            value: symbol
          }))}
          onChange={setStockSelector}
          value={stockSelector}
        />
      </Flex>
      <ActivateStorePower
        disabled={
          stockSelector === undefined ||
          stockSelector === "" ||
          playerSelector === undefined ||
          playerSelector === ""
        }
        onClick={lockPlayerStock}
        storePower="stockLock"
      />
    </Flex>
  );
};
