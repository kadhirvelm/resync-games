"use client";

import { ReduxGate } from "@/stores/ReduxGate";
import { initialize } from "@/stores/tiles/pawnState";
import { setGame } from "@/stores/tiles/tileGameState";
import { initializeTileStore } from "@/stores/tiles/tilesStore";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  CompleteTileMap as ICompleteTileMap,
  TileGameWithPawns
} from "@tiles-tbd/api";
import { indexTileMap } from "./utils/indexTileMap";
import { TileMap } from "./tileMap/TileMap";

export const InitializeTileMap = ({
  tileMap,
  game
}: {
  game?: TileGameWithPawns;
  tileMap: ICompleteTileMap;
}) => {
  const { outboundEdges, tilesIndexed } = indexTileMap(tileMap);

  const createInitialPawns = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(
      initialize({ outboundEdges, pawns: game?.pawns ?? [], tilesIndexed })
    );
    dispatch(setGame(game));
  };

  return (
    <ReduxGate
      createStore={initializeTileStore}
      initializeStore={createInitialPawns}
    >
      <TileMap tileMap={tileMap} />
    </ReduxGate>
  );
};
