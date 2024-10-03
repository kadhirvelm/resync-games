import { createSelector } from "@reduxjs/toolkit";
import { TileId, TilePawn } from "@resync-games/api";
import { GameStateStore } from "../gameStateStore";

export const selectPawnIndex = createSelector(
  (state: GameStateStore) => state.pawnState.pawnState,
  (pawnStates) => {
    const indexedPawns: Record<TileId, TilePawn[]> = {};
    for (const tilePawn of Object.values(pawnStates)) {
      indexedPawns[tilePawn.onTileId] = indexedPawns[tilePawn.onTileId] ?? [];
      indexedPawns[tilePawn.onTileId]?.push(tilePawn);
    }

    return indexedPawns;
  }
);
