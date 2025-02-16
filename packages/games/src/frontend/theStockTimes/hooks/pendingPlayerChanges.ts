import { PlayerId } from "@resync-games/api";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../store/theStockTimesRedux";
import { useEffect } from "react";
import { selectPlayerPortfolio } from "../store/selectors";
import {
  StockTimesPendingPlayerActions,
  StockTimesPlayer
} from "../../../backend/theStockTimes/theStockTimes";
import { cloneDeep } from "lodash";

export function usePendingPlayerChanges() {
  const dispatch = useStockTimesGameStateDispatch();

  const gameState = useStockTimesSelector((s) => s.gameStateSlice.gameState);
  const player = useStockTimesSelector((s) => s.playerSlice.player);
  const playerPortfolio = useStockTimesSelector(selectPlayerPortfolio);

  const pendingPlayerActions =
    gameState?.pendingPlayerActions[player?.playerId ?? ("" as PlayerId)];

  const processActionsAndPortfolio = (
    newPlayerPortfolio: StockTimesPlayer,
    newPlayerActions: StockTimesPendingPlayerActions
  ) => {
    if (player === undefined) {
      return;
    }

    dispatch(
      updateTheStockTimesGameState(
        {
          pendingPlayerActions: {
            [player.playerId]: newPlayerActions
          },
          players: {
            [player.playerId]: newPlayerPortfolio
          }
        },
        player
      )
    );
  };

  useEffect(() => {
    if (pendingPlayerActions === undefined || playerPortfolio === undefined) {
      return;
    }

    // TODO: display a toast when these activate

    const newPlayerActions = { ...pendingPlayerActions };
    const newPlayerPortfolio = cloneDeep(playerPortfolio);

    if (pendingPlayerActions.cashInflux !== undefined) {
      newPlayerPortfolio.cash += pendingPlayerActions.cashInflux;
      newPlayerPortfolio.lastUpdatedAt = new Date().toISOString();

      newPlayerActions.cashInflux = undefined;
      newPlayerActions.lastUpdatedAt = new Date().toISOString();
    }

    if (pendingPlayerActions.lockCashSpending !== undefined) {
      newPlayerPortfolio.lockCashSpending =
        pendingPlayerActions.lockCashSpending;
      newPlayerPortfolio.lastUpdatedAt = new Date().toISOString();

      newPlayerActions.lockCashSpending = undefined;
      newPlayerActions.lastUpdatedAt = new Date().toISOString();
    }

    if (pendingPlayerActions.stockLock !== undefined) {
      newPlayerPortfolio.stockLocks[
        pendingPlayerActions.stockLock.stockSymbol
      ] = pendingPlayerActions.stockLock.lock;
      newPlayerPortfolio.lastUpdatedAt = new Date().toISOString();

      newPlayerActions.stockLock = undefined;
      newPlayerActions.lastUpdatedAt = new Date().toISOString();
    }

    processActionsAndPortfolio(newPlayerPortfolio, newPlayerActions);
  }, [pendingPlayerActions?.lastUpdatedAt]);
}
