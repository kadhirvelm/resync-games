import { getTeamName } from "@/lib/stableIdentifiers/teamIdentifier";
import { createSelector } from "@reduxjs/toolkit";
import { PlayerInGame } from "@resync-games/api";
import { TheStockTimesReduxState } from "./theStockTimesRedux";
import { TheStockTimesGameConfiguration } from "../../../backend/theStockTimes/theStockTimes";

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

export const selectTeammates = createSelector(
  [
    selectTeams,
    selectPlayerPortfolio,
    (state: TheStockTimesReduxState) => state.playerSlice.player
  ],
  (teams, playerPortfolio, player) => {
    const teammates = teams[playerPortfolio?.team ?? 0]?.players ?? [];
    return teammates.filter((p) => p.playerId !== player?.playerId);
  }
);

export const selectOpponents = createSelector(
  [selectTeams, selectPlayerPortfolio],
  (teams, playerPortfolio) => {
    const opponents = Object.entries(teams).filter(
      ([teamNumber]) => teamNumber !== playerPortfolio?.team?.toString()
    );
    return opponents.flatMap(([_teamNumber, { players }]) => players);
  }
);

export const selectTotalTeamValue = createSelector(
  [
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameInfo?.players,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.players,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.stocks,
    selectTeams,
    (state: TheStockTimesReduxState) =>
      state.gameStateSlice.gameState?.pendingPlayerActions
  ],
  (players, gamePlayers, stocks, existingTeams, pendingPlayerActions) => {
    const teams: {
      [teamNumber: number]: { averageTeamValue: number; totalPlayers: number };
    } = {};
    for (const player of players ?? []) {
      const accordingPlayer = gamePlayers?.[player.playerId];
      const heldStockValue = Object.entries(
        accordingPlayer?.ownedStocks ?? {}
      ).reduce((previous, [symbol, ownedStocks]) => {
        const accordingStock = stocks?.[symbol];
        const latestPrice = accordingStock?.history[0]?.price ?? 0;
        const totalValue = ownedStocks.reduce(
          (acc, stock) => acc + stock.quantity * latestPrice,
          0
        );
        const pendingCashInflux =
          pendingPlayerActions?.[player.playerId]?.cashInflux ?? 0;

        return previous + totalValue + pendingCashInflux;
      }, 0);

      teams[player.team ?? 0] = {
        averageTeamValue:
          (teams[player.team ?? 0]?.averageTeamValue ?? 0) +
          (accordingPlayer?.cash ?? 0) -
          (accordingPlayer?.debt ?? 0) +
          heldStockValue,
        totalPlayers: (teams[player.team ?? 0]?.totalPlayers ?? 0) + 1
      };
    }

    const finalTeamValues = Object.fromEntries(
      Object.entries(teams).map(([teamNumber, value]) => [
        teamNumber,
        {
          ...existingTeams[teamNumber],
          ...value,
          averageTeamValue: value.averageTeamValue / value.totalPlayers
        }
      ])
    );

    return Object.values(finalTeamValues).sort((a, b) =>
      a.averageTeamValue > b.averageTeamValue ? -1 : 1
    );
  }
);

export const selectFocusedStock = createSelector(
  [
    (state: TheStockTimesReduxState) =>
      state.gameStateSlice.gameState?.stockInFocus.stockOrder[
        state.gameStateSlice.gameState.stockInFocus.symbolIndex
      ]
  ],
  (focusedStock) => focusedStock
);

export const selectFocusedStockData = createSelector(
  [
    selectFocusedStock,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.stocks
  ],
  (focusedStock, stocks) => {
    if (focusedStock === undefined) {
      return;
    }

    return { stock: stocks?.[focusedStock], symbol: focusedStock };
  }
);

export const selectFocusedStockArticle = createSelector(
  [
    selectFocusedStock,
    (state: TheStockTimesReduxState) =>
      state.gameStateSlice.gameState?.newsArticles.articles
  ],
  (focusedStock, articlesByStock) => {
    if (focusedStock === undefined) {
      return;
    }

    return (articlesByStock?.[focusedStock] ?? [])[0];
  }
);

export const selectStocksAndSymbols = createSelector(
  [(state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.stocks],
  (stocks) => {
    if (stocks === undefined) {
      return {};
    }

    const stocksToSymbols: { [stockSymbol: string]: string } =
      Object.fromEntries(
        Object.keys(stocks ?? {}).map((symbol) => [symbol, symbol])
      );

    for (const [symbol, stock] of Object.entries(stocks)) {
      stocksToSymbols[stock.title] = symbol;

      stock.title.split(" ").forEach((token) => {
        stocksToSymbols[token] = symbol;
      });
    }

    return stocksToSymbols;
  }
);

export const selectStocksWithOrder = createSelector(
  [
    (state: TheStockTimesReduxState) =>
      state.gameStateSlice.gameState?.stocks ?? {},
    (state: TheStockTimesReduxState) =>
      state.gameStateSlice.gameState?.stockInFocus.stockOrder
  ],
  (stocks, stockOrder) => {
    if (stocks === undefined) {
      return [];
    }

    const stocksWithOrder = Object.entries(stocks).map(([symbol, stock]) => {
      const orderIndex = (stockOrder ?? []).indexOf(symbol);

      return {
        ...stock,
        orderIndex: `${orderIndex + 1} / ${(stockOrder ?? []).length}`,
        symbol
      };
    });

    return stocksWithOrder.sort((a, b) =>
      a.orderIndex < b.orderIndex ? -1 : 1
    );
  }
);

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const selectEndGameGraph = createSelector(
  [
    (state: TheStockTimesReduxState) =>
      state.gameStateSlice.gameInfo?.gameConfiguration as
        | TheStockTimesGameConfiguration
        | undefined,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.cycle,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.players,
    (state: TheStockTimesReduxState) => state.gameStateSlice.gameState?.stocks
  ],
  (gameConfiguration, cycle, players, stocks) => {
    const teams: {
      [teamNumber: string]: {
        [relativeDate: string]: number;
      };
    } = {};

    if (cycle === undefined || gameConfiguration === undefined) {
      return teams;
    }

    const endTime = (cycle.dayTime + cycle.nightTime) * (cycle.endDay - 1);

    for (const player of Object.values(players ?? {})) {
      teams[player.team] = teams[player.team] ?? {};
      teams[player.team]![0] =
        (teams[player.team]?.[0] ?? 0) + gameConfiguration.startingCash;

      for (const transaction of player.transactionHistory) {
        const amount = transaction.quantity * transaction.price;
        if (transaction.type === "buy") {
          continue;
        }

        // const delta = transaction.type === "buy" ? -amount : amount; -> see if this is a more interesting graph
        teams[player.team]![transaction.clockTime] =
          (teams[player.team]![transaction.clockTime] ?? 0) + amount;
      }

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

      teams[player.team]![endTime] = heldStockValue;
    }

    const allTeams = Object.keys(teams);
    const allDates = Array.from(
      new Set(allTeams.flatMap((team) => Object.keys(teams[team] ?? {})))
    ).sort((a, b) => parseInt(a) - parseInt(b));

    const currentValueTracker = Object.fromEntries(
      Object.keys(teams).map((team) => [team, 0])
    );
    for (const team of allTeams) {
      for (const date of allDates) {
        if (teams[team]?.[date] !== undefined) {
          currentValueTracker[team] =
            (currentValueTracker[team] ?? 0) + teams[team]![date];
        }

        teams[team]![date] = currentValueTracker[team] ?? 0;
      }
    }

    return teams;
  }
);
