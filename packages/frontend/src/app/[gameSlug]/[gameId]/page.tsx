"use client";

import { GetGameState } from "@/components/inGame/GetGameState";
import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";
import { GameId, GameType } from "@resync-games/api";

export default function Page({
  params: { gameSlug, gameId }
}: {
  params: { gameId: GameId; gameSlug: GameType };
}) {
  return (
    <ClientGate>
      <PlayerContextProvider gameId={gameId}>
        <GetGameState gameId={gameId} gameSlug={gameSlug} />
      </PlayerContextProvider>
    </ClientGate>
  );
}
