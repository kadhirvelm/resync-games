import { createSelector } from "@reduxjs/toolkit";
import { TileId, TilePawn } from "@tiles-tbd/api";
import { TileStore } from "../tilesStore";

export const selectPawnIndex = createSelector(
  (state: TileStore) => state.pawnState.pawnState,
  (pawnStates) => {
    const indexedPawns: Record<TileId, TilePawn[]> = {};
    for (const tilePawn of Object.values(pawnStates)) {
      indexedPawns[tilePawn.onTileId] = indexedPawns[tilePawn.onTileId] ?? [];
      indexedPawns[tilePawn.onTileId]?.push(tilePawn);
    }

    return indexedPawns;
  }
);
