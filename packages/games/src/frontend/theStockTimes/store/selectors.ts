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
