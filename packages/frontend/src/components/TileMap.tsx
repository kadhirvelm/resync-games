"use client";

import { CompleteTileMap as ICompleteTileMap, TileId } from "@tiles-tbd/api";
import { useState } from "react";
import { indexTileMap } from "./utils/indexTileMap";
import { DisplayTile } from "./Tile";

export const TileMap = ({ tileMap }: { tileMap: ICompleteTileMap }) => {
  const { outboundEdges, tilesIndexed } = indexTileMap(tileMap);
  const [tileToDisplay, setTileToDisplay] = useState(
    tileMap.tileMap.startingTileId
  );

  const onTileChange = (newTileId: TileId) => setTileToDisplay(newTileId);

  const tile = tilesIndexed[tileToDisplay];
  const edges = outboundEdges[tileToDisplay] ?? [];

  return <DisplayTile tile={tile} edges={edges} onTileChange={onTileChange} />;
};
