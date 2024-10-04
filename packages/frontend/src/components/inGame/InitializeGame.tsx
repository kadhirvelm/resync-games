"use client";

import { ClientGate } from "@/lib/ClientGate";
import { GameStateAndInfo, GameType } from "@resync-games/api";
import { GameEntry } from "./GameEntry";
import { useMemo } from "react";
import { GameStateReduxStore } from "@/stores/gameStateStore";
import { ReduxGate } from "@/stores/ReduxGate";

export const InitializeGame = ({
  gameSlug,
  gameStateAndInfo
}: {
  gameSlug: GameType;
  gameStateAndInfo: GameStateAndInfo;
}) => {
  const gameStateStore = useMemo(
    () => GameStateReduxStore.fromGameStateAndInfo(gameStateAndInfo),
    [gameStateAndInfo]
  );

  return (
    <ClientGate>
      <ReduxGate createStore={() => gameStateStore.getReduxStore()}>
        {() => (
          <GameEntry
            gameId={gameStateAndInfo.gameId}
            gameSlug={gameSlug}
            store={gameStateStore}
          />
        )}
      </ReduxGate>
    </ClientGate>
  );
};
