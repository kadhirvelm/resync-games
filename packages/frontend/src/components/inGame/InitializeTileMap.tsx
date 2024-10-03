"use client";

import { ClientGate } from "@/lib/ClientGate";
import { ReduxGate } from "@/stores/ReduxGate";
import { setGame } from "@/stores/gameState/gameState";
import { initializeTileStore } from "@/stores/gameState/gameStateStore";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { GameState } from "@resync-games/api";
import { TileMap } from "./tileMap/TileMap";

export const InitializeTileMap = ({
  gameStateAndInfo
}: {
  gameStateAndInfo: GameState;
}) => {
  const createInitialStore = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(setGame(gameStateAndInfo));
  };

  return (
    <ClientGate>
      <ReduxGate
        createStore={initializeTileStore}
        initializeStore={createInitialStore}
      >
        <TileMap gameId={gameStateAndInfo.gameId} />
      </ReduxGate>
    </ClientGate>
  );
};
