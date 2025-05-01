import { PlayerId } from "@/imports/api";
import { cycleTime } from "@/imports/games-shared";
import { useState } from "react";
import { Flex, Select, DisplayText } from "@/lib/radix";
import { selectOpponents, selectPlayerPortfolio } from "../../store/selectors";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../store/theStockTimesRedux";
import { ActivateStorePower } from "../store/ActivateStorePower";

export const CASH_LOCK_DURATION = 0.75;
export const CASH_LOCK_COOLDOWN = 3;

export const CashLock = () => {
  const dispatch = useStockTimesGameStateDispatch();

  const player = useStockTimesSelector((s) => s.playerSlice.player);
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const pendingPlayerActions = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.pendingPlayerActions
  );

  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);
  const opponents = useStockTimesSelector(selectOpponents);

  const [playerSelector, setPlayerSelector] = useState(opponents[0]?.playerId);

  if (playerPortfolio === undefined || opponents.length === 0) {
    return <DisplayText color="gray">No opponents available</DisplayText>;
  }

  const lockPlayerCash = () => {
    if (
      player === undefined ||
      cycle === undefined ||
      playerSelector === undefined ||
      pendingPlayerActions?.[playerSelector]?.lockCashSpending !== undefined
    ) {
      return;
    }

    const totalDuration =
      (cycle.dayTime + cycle.nightTime) * CASH_LOCK_DURATION;
    const cashLockCooldown =
      (cycle.dayTime + cycle.nightTime) * CASH_LOCK_COOLDOWN;
    const usedAt = cycleTime(cycle).currentTime;

    dispatch(
      updateTheStockTimesGameState(
        {
          pendingPlayerActions: {
            [playerSelector]: {
              lastUpdatedAt: new Date().toISOString(),
              lockCashSpending: {
                availabilityTime: totalDuration,
                lockedAt: usedAt
              }
            }
          },
          players: {
            [player.playerId]: {
              ...playerPortfolio,
              lastUpdatedAt: new Date().toISOString(),
              storePowers: {
                ...playerPortfolio.storePowers,
                lockCashSpending: {
                  cooldownTime: cashLockCooldown,
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
      <Select<PlayerId>
        items={opponents.map((player) => ({
          label: player.displayName,
          value: player.playerId
        }))}
        onChange={setPlayerSelector}
        value={playerSelector}
      />
      <ActivateStorePower
        disabled={playerSelector === undefined || playerSelector === ""}
        onClick={lockPlayerCash}
        storePower="lockCashSpending"
      />
    </Flex>
  );
};
