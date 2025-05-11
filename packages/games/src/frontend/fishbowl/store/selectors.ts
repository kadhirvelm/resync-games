import { createSelector } from "@reduxjs/toolkit";
import { FishbowlReduxState } from "./fishbowlRedux";
import { FishbowlGameConfiguration, FishbowlPlayer } from "../../../backend";

const selectPlayerTeam = createSelector(
  [
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) => state.gameStateSlice.gameInfo?.players
  ],
  (player, players) => {
    if (player === undefined || players === undefined) {
      return;
    }

    return players.find((p) => p.playerId === player.playerId)?.team ?? 0;
  }
);

export const selectFishbowlPlayer = createSelector(
  [selectPlayerTeam, (state: FishbowlReduxState) => state.playerSlice.player],
  (playerTeam, player): FishbowlPlayer | undefined => {
    if (playerTeam === undefined || player === undefined) {
      return;
    }

    return {
      playerId: player.playerId,
      teamNumber: (playerTeam ?? 0).toString()
    };
  }
);

export const selectPlayerContributions = createSelector(
  [
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameState?.playerWordContributions
  ],
  (player, contributions) => {
    if (player === undefined) {
      return;
    }

    return contributions?.[player.playerId];
  }
);

export const selectExpectedWordContributionCount = createSelector(
  [
    (state: FishbowlReduxState) =>
      state.gameStateSlice.gameInfo?.gameConfiguration as
        | FishbowlGameConfiguration
        | undefined
  ],
  (gameConfiguration) => {
    return gameConfiguration?.wordsPerPlayer ?? 0;
  }
);
