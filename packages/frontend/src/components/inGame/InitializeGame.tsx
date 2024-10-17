"use client";

import { ClientGate } from "@/lib/ClientGate";
import { ReduxGate } from "@/lib/resync-components/ReduxGate";
import {
  GameStateReduxStore,
  initializeGameStateStore,
  setGame
} from "@/redux";
import { UnknownAction } from "@reduxjs/toolkit";
import { GameStateAndInfo, GameType } from "@resync-games/api";
import { Dispatch } from "react";
import { PlayerContextProvider } from "../player/PlayerContext";
import { GameEntry } from "./GameEntry";

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
      <PlayerContextProvider>
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
      </PlayerContextProvider>
    </ClientGate>
  );
};
