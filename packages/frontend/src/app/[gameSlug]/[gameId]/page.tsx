"use client";

import { GetGameState } from "@/components/inGame/GetGameState";
import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";
import { GameId, GameType } from "@resync-games/api";
import { useParams } from "next/navigation";

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
