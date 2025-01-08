import { useMemo, useState } from "react";
import { selectOpponents, selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { Flex, Select, Text } from "../../../components";
import { ActivateStorePower } from "../store/ActivateStorePower";
import { PlayerId } from "@resync-games/api";

export const STOCK_LOCK_DURATION = 0.75;
export const STOCK_LOCK_COOLDOWN = 1.5;

export const StockLock = () => {
  const dispatch = useGameStateDispatch();

  const player = useGameStateSelector((s) => s.playerSlice.player);
  const cycle = useGameStateSelector((s) => s.gameStateSlice.gameState?.cycle);
  const pendingPlayerActions = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.pendingPlayerActions
  );

  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);
  const opponents = useGameStateSelector(selectOpponents);
  const stocks = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.stocks ?? {}
  );

  const sortedStock = useMemo(() => {
    return Object.entries(stocks).sort(([aSymbol], [bSymbol]) => {
      return aSymbol.localeCompare(bSymbol);
    });
  }, [stocks]);

  const [playerSelector, setPlayerSelector] = useState(opponents[0]?.playerId);
  const [stockSelector, setStockSelector] = useState(sortedStock[0]?.[0]);

  if (playerPortfolio === undefined || opponents.length === 0) {
    return <Text color="gray">No opponents available</Text>;
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
        <Text color="gray" size="2">
          Player
        </Text>
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
        <Text color="gray" size="2">
          Stock
        </Text>
        <Select
          items={sortedStock.map(([symbol, stock]) => ({
            label: `[${symbol}] ${stock.title}`,
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
