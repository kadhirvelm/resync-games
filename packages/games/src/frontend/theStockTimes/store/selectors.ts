import { createSelector } from "@reduxjs/toolkit";
import { TheStockTimesReduxState } from "./theStockTimesRedux";
import { PlayerInGame } from "@resync-games/api";
import { getTeamName } from "@/lib/stableIdentifiers/teamIdentifier";

export const selectPlayerPortfolio = createSelector(
  [
    (state: TheStockTimesReduxState) => state.playerSlice.player,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.players
  ],
  (player, gamePlayers) => {
    if (player === undefined) {
      return;
    }

    return gamePlayers?.[player?.playerId];
  }
);

export const selectTeams = createSelector(
  [
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameInfo?.players,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.players
  ],
  (players, theStockTimesPlayers) => {
    if (players === undefined) {
      return {};
    }

    const teams: { [teamNumber: number]: PlayerInGame[] } = {};
    for (const player of players) {
      teams[player.team ?? 0] = teams[player.team ?? 0] ?? [];
      teams[player.team ?? 0]?.push(player);
    }

    return Object.fromEntries(
      Object.entries(teams).map(([teamNumber, players]) => [
        teamNumber,
        {
          players,
          teamCash: players.reduce(
            (previous, next) =>
              previous + (theStockTimesPlayers?.[next.playerId]?.cash ?? 0),
            0
          ),
          teamName: getTeamName(players, parseFloat(teamNumber))
        }
      ])
    );
  }
);

export const selectTotalTeamValue = createSelector(
  [
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.players,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.stocks,
    selectTeams
  ],
  (players, stocks, existingTeams) => {
    const teams: { [teamNumber: number]: { totalValue: number } } = {};
    for (const player of Object.values(players ?? {})) {
      const heldStockValue = Object.entries(player.ownedStocks ?? {}).reduce(
        (previous, [symbol, ownedStocks]) => {
          const accordingStock = stocks?.[symbol];
          const latestPrice = accordingStock?.history[0]?.price ?? 0;
          const totalValue = ownedStocks.reduce(
            (acc, stock) => acc + stock.quantity * latestPrice,
            0
          );

          return previous + totalValue;
        },
        0
      );

      teams[player.team] = {
        totalValue:
          (teams[player.team]?.totalValue ?? 0) + player.cash + heldStockValue
      };
    }

    const finalTeamValues = Object.fromEntries(
      Object.entries(teams).map(([teamNumber, value]) => [
        teamNumber,
        {
          ...existingTeams[teamNumber],
          ...value
        }
      ])
    );

    return Object.values(finalTeamValues).sort((a, b) =>
      a.totalValue > b.totalValue ? -1 : 1
    );
  }
);
