"use client";

import { ClientGate } from "@/lib/ClientGate";
import { initializeTileStore } from "@/stores/gameState/gameStateStore";
import { ReduxGate } from "@/stores/ReduxGate";
import { GameStateAndInfo, GameType } from "@resync-games/api";
import { GameEntry } from "./GameEntry";
import { setGame } from "@/stores/gameState/gameState";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const InitializeGame = ({
  gameSlug,
  gameStateAndInfo
}: {
  gameSlug: GameType;
  gameStateAndInfo: GameStateAndInfo;
}) => {
  const setInitialState = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(setGame(gameStateAndInfo));
  };

  return (
    <ClientGate>
      <ReduxGate
        createStore={initializeTileStore}
        initializeStore={setInitialState}
      >
        {(store) => (
          <GameEntry
            gameId={gameStateAndInfo.gameId}
            gameSlug={gameSlug}
            store={store}
          />
        )}
      </ReduxGate>
    </ClientGate>
  );
};
