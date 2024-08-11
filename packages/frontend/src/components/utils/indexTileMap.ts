import { CompleteTileMap } from "@tiles-tbd/api";

export function indexTileMap(tileMap: CompleteTileMap) {
  const tilesIndexed = tileMap.tiles.reduce(
    (acc, tile) => {
      acc[tile.tileId] = tile;
      return acc;
    },
    {} as Record<string, (typeof tileMap.tiles)[0]>
  );

  const outboundEdges = tileMap.edges.reduce(
    (acc, edge) => {
      acc[edge.fromTileId] = acc[edge.fromTileId] ?? [];
      acc[edge.fromTileId].push(edge);
      return acc;
    },
    {} as Record<string, (typeof tileMap.edges)[0][]>
  );

  return { outboundEdges, tilesIndexed };
}
