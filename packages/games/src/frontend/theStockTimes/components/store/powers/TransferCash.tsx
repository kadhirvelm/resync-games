import { RocketIcon } from "@radix-ui/react-icons";
import { PlayerId } from "@resync-games/api";
import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { useState } from "react";
import { Button, Flex, Select, Text, TextField } from "../../../../components";
import {
  selectPlayerPortfolio,
  selectTeammates
} from "../../../store/selectors";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../../store/theStockTimesRedux";
import { ActivateStorePower } from "../ActivateStorePower";

export const TRANSFER_CASH_COOLDOWN = 0.5;

export const TransferCash = () => {
  const dispatch = useStockTimesGameStateDispatch();

  const player = useStockTimesSelector((s) => s.playerSlice.player);
  const cycle = useStockTimesSelector((s) => s.gameStateSlice.gameState?.cycle);
  const pendingPlayerActions = useStockTimesSelector(
    (s) => s.gameStateSlice.gameState?.pendingPlayerActions
  );

  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);
  const teammates = useStockTimesSelector(selectTeammates);

  const [playerSelector, setPlayerSelector] = useState<PlayerId | undefined>(
    teammates[0]?.playerId
  );
  const [cashSelector, setCashSelector] = useState<string>("0");

  if (playerPortfolio === undefined || teammates.length === 0) {
    return <Text color="gray">No teammates available</Text>;
  }

  const totalCash = parseFloat(cashSelector);

  const transferCash = () => {
    if (
      player === undefined ||
      cycle === undefined ||
      playerSelector === undefined ||
      pendingPlayerActions?.[playerSelector]?.cashInflux !== undefined ||
      Number.isNaN(totalCash)
    ) {
      return;
    }

    const newPlayerCash = playerPortfolio.cash - totalCash;

    const transferCooldown =
      (cycle.dayTime + cycle.nightTime) * TRANSFER_CASH_COOLDOWN;
    const usedAt = cycleTime(cycle).currentTime;

    dispatch(
      updateTheStockTimesGameState(
        {
          pendingPlayerActions: {
            [playerSelector]: {
              cashInflux: totalCash,
              lastUpdatedAt: new Date().toISOString()
            }
          },
          players: {
            [player.playerId]: {
              ...playerPortfolio,
              cash: newPlayerCash,
              lastUpdatedAt: new Date().toISOString(),
              storePowers: {
                ...playerPortfolio.storePowers,
                transferCash: {
                  cooldownTime: transferCooldown,
                  usedAt
                }
              }
            }
          }
        },
        player
      )
    );

    setCashSelector("0");
  };

  const canActivate = (() => {
    if (playerSelector === undefined) {
      return false;
    }

    return (
      pendingPlayerActions?.[playerSelector]?.cashInflux === undefined &&
      totalCash <= playerPortfolio.cash * 0.5
    );
  })();

  const setToHalf = () =>
    setCashSelector(
      (Math.round((playerPortfolio.cash / 2) * 100) / 100).toString()
    );

  return (
    <Flex direction="column" flex="1" gap="2">
      <Select<PlayerId>
        items={teammates.map((player) => ({
          label: player.displayName,
          value: player.playerId
        }))}
        onChange={setPlayerSelector}
        value={playerSelector}
      />
      <Flex align="center" flex="1" gap="2">
        <Flex gap="2">
          <TextField
            onChange={setCashSelector}
            type="number"
            value={cashSelector}
          />
          <Button onClick={setToHalf} variant="outline">
            <RocketIcon />
          </Button>
        </Flex>
        <Flex flex="1">
          <ActivateStorePower
            disabled={!canActivate}
            onClick={transferCash}
            storePower="transferCash"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
