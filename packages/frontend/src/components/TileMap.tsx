"use client";

import { ReduxGate } from "@/stores/ReduxGate";
import {
  setInitialPawns,
  setOutboundEdges,
  setTilesIndexed
} from "@/stores/tiles/pawnState";
import { initializeTileStore } from "@/stores/tiles/tilesStore";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { CompleteTileMap as ICompleteTileMap, TilePawn } from "@tiles-tbd/api";
import { Box } from "grommet";
import { DisplayTile } from "./DisplayTile";
import { PawnMovement } from "./PawnMovement";
import { indexTileMap } from "./utils/indexTileMap";

export const TileMap = ({
  tileMap,
  pawns
}: {
  pawns?: TilePawn[];
  tileMap: ICompleteTileMap;
}) => {
  const { outboundEdges, tilesIndexed } = indexTileMap(tileMap);

  const createInitialPawns = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(setInitialPawns(pawns ?? []));
    dispatch(setOutboundEdges(outboundEdges));
    dispatch(setTilesIndexed(tilesIndexed));
  };

  return (
    <ReduxGate
      createStore={initializeTileStore}
      initializeStore={createInitialPawns}
    >
      <Box direction="row" style={{ padding: "10px" }}>
        <DisplayTile
          tilesIndexed={tilesIndexed}
          outboundEdgesIndexed={outboundEdges}
          tileId={tileMap.tileMap.startingTileId}
        />
      </Box>
      <PawnMovement />
    </ReduxGate>
  );
};
