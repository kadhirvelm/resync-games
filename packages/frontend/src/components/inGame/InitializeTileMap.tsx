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
} from "@resync-games/api";
import { indexTileMap } from "./utils/indexTileMap";
import { TileMap } from "./tileMap/TileMap";
import { ClientGate } from "@/lib/ClientGate";
import { setMap } from "@/stores/tiles/tileMap";

const DEFAULT_GAME_ID = "DEFAULT_GAME_ID" as TileGameId;

export const InitializeTileMap = ({
  tileMap,
  game
}: {
  game?: TileGameWithPawns;
  tileMap: ICompleteTileMap;
}) => {
  const { outboundEdges, tilesIndexed } = indexTileMap(tileMap);

  const createInitialStore = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(
      initialize({ outboundEdges, pawns: game?.pawns ?? [], tilesIndexed })
    );
    dispatch(setGame(game));
    dispatch(setMap(tileMap));
  };

  return (
    <ClientGate>
      <ReduxGate
        createStore={initializeTileStore}
        initializeStore={createInitialStore}
      >
        <TileMap tileGameId={game?.tileGameId ?? DEFAULT_GAME_ID} />
      </ReduxGate>
    </ClientGate>
  );
};
