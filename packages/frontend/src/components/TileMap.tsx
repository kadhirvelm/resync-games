"use client";

import { useTileSocket } from "@/socket/useTileSocket";
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
import { DisplayTiles } from "./DisplayTiles";
import { PawnMovement } from "./tileMap/PawnMovement";
import { SelectPawn } from "./tileMap/SelectPawn";
import { indexTileMap } from "./utils/indexTileMap";
import { SocketStatus } from "./SocketStatus";

const WithinRedux = ({ tileMap }: { tileMap: ICompleteTileMap }) => {
  const { connectionStatus } = useTileSocket();

  return (
    <>
      <Box direction="row" style={{ padding: "10px" }}>
        <DisplayTiles tiles={tileMap.tiles} />
      </Box>
      <SelectPawn />
      <PawnMovement />
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};

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
      <WithinRedux tileMap={tileMap} />
    </ReduxGate>
  );
};
