"use client";

import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { GameId, GameType } from "@/imports/api";
import { ClientGate } from "@/lib/ClientGate";
import { useParams } from "next/navigation";
import GetGameState from "@/components/inGame/GetGameState";

export default function Page() {
  const { gameSlug, gameId } = useParams<{
    gameId: GameId;
    gameSlug: GameType;
  }>();

  return (
    <ClientGate>
      <PlayerContextProvider gameId={gameId}>
        <GetGameState gameId={gameId} gameSlug={gameSlug} />
      </PlayerContextProvider>
    </ClientGate>
  );
}
