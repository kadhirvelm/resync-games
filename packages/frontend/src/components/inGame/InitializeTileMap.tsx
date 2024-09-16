"use client";

import { ReduxGate } from "@/stores/ReduxGate";
import { initialize } from "@/stores/tiles/pawnState";
import { setGame } from "@/stores/tiles/tileGameState";
import { initializeTileStore } from "@/stores/tiles/tilesStore";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  CompleteTileMap as ICompleteTileMap,
  TileGameId,
  TileGameWithPawns
} from "@tiles-tbd/api";
import { indexTileMap } from "./utils/indexTileMap";
import { TileMap } from "./tileMap/TileMap";
import { ClientGate } from "@/lib/ClientGate";

const DEFAULT_GAME_ID = "DEFAULT_GAME_ID" as TileGameId;

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
    <ClientGate>
      <ReduxGate
        createStore={initializeTileStore}
        initializeStore={createInitialPawns}
      >
        <TileMap
          tileGameId={game?.tileGameId ?? DEFAULT_GAME_ID}
          tileMap={tileMap}
        />
      </ReduxGate>
    </ClientGate>
  );
};
