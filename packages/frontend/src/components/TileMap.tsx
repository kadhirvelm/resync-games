"use client";

import { CompleteTileMap as ICompleteTileMap, TilePawn } from "@tiles-tbd/api";
import { DisplayTile } from "./DisplayTile";
import { indexTileMap } from "./utils/indexTileMap";
import { Box } from "grommet";
import { indexPawns } from "./utils/indexPawns";

export const TileMap = ({
  tileMap,
  pawns
}: {
  pawns?: TilePawn[];
  tileMap: ICompleteTileMap;
}) => {
  const { outboundEdges, tilesIndexed } = indexTileMap(tileMap);
  const { indexedPawns } = indexPawns(pawns ?? []);

  console.log(indexedPawns);

  return (
    <Box direction="row" style={{ padding: "10px" }}>
      <DisplayTile
        tilesIndexed={tilesIndexed}
        outboundEdgesIndexed={outboundEdges}
        indexedPawns={indexedPawns}
        tileId={tileMap.tileMap.startingTileId}
      />
    </Box>
  );
};
