import { createSelector } from "@reduxjs/toolkit";
import { FishbowlGameConfiguration } from "../../../backend";
import { FishbowlReduxState } from "./fishbowlRedux";

export const selectFishbowlPlayer = createSelector(
  [
    (state: FishbowlReduxState) => state.playerSlice.player,
    (state: FishbowlReduxState) => state.gameStateSlice.gameInfo?.players
  ],
  (player, players) => {
    if (player === undefined || players === undefined) {
      return;
    }

    return players.find((p) => p.playerId === player.playerId);
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
