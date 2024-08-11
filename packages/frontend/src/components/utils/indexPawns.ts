import { TileId, TilePawn } from "@tiles-tbd/api";

export function indexPawns(tilePawns: TilePawn[]): {
  indexedPawns: Record<TileId, TilePawn[]>;
} {
  const indexedPawns: Record<TileId, TilePawn[]> = {};
  for (const tilePawn of tilePawns) {
    indexedPawns[tilePawn.onTileId] = indexedPawns[tilePawn.onTileId] ?? [];
    indexedPawns[tilePawn.onTileId].push(tilePawn);
  }

  return { indexedPawns };
}
