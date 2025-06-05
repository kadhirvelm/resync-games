import { createSelector } from "@reduxjs/toolkit";
import { GameStateStoreWithStates } from "../../../redux";
import { PlayerInGame } from "../../../imports/api";
import { getTeamName } from "@/lib/stableIdentifiers/teamIdentifier";

type GenericState = GameStateStoreWithStates<never, never>;

export const selectTeamWithNames = createSelector(
  [(state: GenericState) => state.gameStateSlice.gameInfo?.players],
  (players) => {
    if (players === undefined) {
      return;
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
          teamName: getTeamName(players, parseFloat(teamNumber))
        }
      ])
    );
  }
);
