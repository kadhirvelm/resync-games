"use client";

import { ClientGate } from "@/lib/ClientGate";
import { ReduxGate } from "@/stores/ReduxGate";
import { GameStateAndInfo, GameType } from "@resync-games/api";
import {
  GameStateReduxStore,
  initializeGameStateStore,
  setGame
} from "@resync-games/redux-store";
import { GameEntry } from "./GameEntry";
import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

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
        createStore={initializeGameStateStore}
        initializeStore={setInitialState}
      >
        {(store) => (
          <GameEntry
            gameId={gameStateAndInfo.gameId}
            gameSlug={gameSlug}
            store={store as GameStateReduxStore}
          />
        )}
      </ReduxGate>
    </ClientGate>
  );
};
