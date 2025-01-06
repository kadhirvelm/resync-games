import { PlayerId } from "@resync-games/api";
import {
  updateTheStockTimesGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../store/theStockTimesRedux";
import { useEffect } from "react";
import { selectPlayerPortfolio } from "../store/selectors";
import {
  StockTimesPendingPlayerActions,
  StockTimesPlayer
} from "../../../backend/theStockTimes/theStockTimes";

export function usePendingPlayerChanges() {
  const dispatch = useGameStateDispatch();

  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);
  const player = useGameStateSelector((s) => s.playerSlice.player);
  const playerPortfolio = useGameStateSelector(selectPlayerPortfolio);

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

    const newPlayerActions = { ...pendingPlayerActions };
    const newPlayerPortfolio = { ...playerPortfolio };
    if (pendingPlayerActions.cashInflux !== undefined) {
      newPlayerPortfolio.cash += pendingPlayerActions.cashInflux;
      newPlayerPortfolio.lastUpdatedAt = new Date().toISOString();

      newPlayerActions.cashInflux = undefined;
      newPlayerActions.lastUpdatedAt = new Date().toISOString();
    }

    processActionsAndPortfolio(newPlayerPortfolio, newPlayerActions);
  }, [pendingPlayerActions?.lastUpdatedAt]);
}
