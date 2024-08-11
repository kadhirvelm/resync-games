"use client";

import { CompleteTileMap as ICompleteTileMap } from "@tiles-tbd/api";
import { DisplayTile } from "./DisplayTile";
import { indexTileMap } from "./utils/indexTileMap";
import { Box } from "grommet";

export const TileMap = ({ tileMap }: { tileMap: ICompleteTileMap }) => {
  const { outboundEdges, tilesIndexed } = indexTileMap(tileMap);

  return (
    <Box direction="row" style={{ padding: "10px" }}>
      <DisplayTile
        tilesIndexed={tilesIndexed}
        outboundEdgesIndexed={outboundEdges}
        tileId={tileMap.tileMap.startingTileId}
      />
    </Box>
  );
};
