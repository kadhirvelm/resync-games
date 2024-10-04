"use client";

import { ClientGate } from "@/lib/ClientGate";
import { GameStateAndInfo, GameType } from "@resync-games/api";
import { GameEntry } from "./GameEntry";
import { useMemo } from "react";
import { GameStateReduxStore } from "@/stores/gameStateStore";

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
      <GameEntry
        gameId={gameStateAndInfo.gameId}
        gameSlug={gameSlug}
        store={gameStateStore}
      />
    </ClientGate>
  );
};
