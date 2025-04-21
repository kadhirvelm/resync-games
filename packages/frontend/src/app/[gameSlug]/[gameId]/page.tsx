"use client";

import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";
import { GameId, GameType } from "@resync-games/api";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const GetGameStateWithoutSSR = dynamic(
  () => import("@/components/inGame/GetGameState"),
  { ssr: false }
);

export default function Page() {
  const { gameSlug, gameId } = useParams<{
    gameId: GameId;
    gameSlug: GameType;
  }>();

  return (
    <ClientGate>
      <PlayerContextProvider gameId={gameId}>
        <GetGameStateWithoutSSR gameId={gameId} gameSlug={gameSlug} />
      </PlayerContextProvider>
    </ClientGate>
  );
}
