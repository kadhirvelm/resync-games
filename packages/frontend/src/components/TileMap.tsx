"use client";

import { useTileSocket } from "@/socket/useTileSocket";
import { ReduxGate } from "@/stores/ReduxGate";
import {
  setPawns,
  setOutboundEdges,
  setTilesIndexed
} from "@/stores/tiles/pawnState";
import { initializeTileStore } from "@/stores/tiles/tilesStore";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  CompleteTileMap as ICompleteTileMap,
  TileGameWithPawns
} from "@tiles-tbd/api";
import { Box } from "grommet";
import { DisplayTiles } from "./DisplayTiles";
import { SocketStatus } from "./SocketStatus";
import { PawnMovement } from "./tileMap/PawnMovement";
import { SelectPawn } from "./tileMap/SelectPawn";
import { indexTileMap } from "./utils/indexTileMap";
import { setGame } from "@/stores/tiles/tileGameState";

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
  game
}: {
  game?: TileGameWithPawns;
  tileMap: ICompleteTileMap;
}) => {
  const { outboundEdges, tilesIndexed } = indexTileMap(tileMap);

  const createInitialPawns = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(setPawns(game?.pawns ?? []));
    dispatch(setOutboundEdges(outboundEdges));
    dispatch(setTilesIndexed(tilesIndexed));
    dispatch(setGame(game));
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
