"use client";

import { GlobalScreen } from "@/components/globalScreen/GlobalScreen";
import { GlobalScreenPlayerContextProvider } from "@/components/globalScreen/GlobalScreenPlayerContextProvider";
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
      <GlobalScreenPlayerContextProvider gameId={gameId}>
        <GlobalScreen gameId={gameId} gameSlug={gameSlug} />
      </GlobalScreenPlayerContextProvider>
    </ClientGate>
  );
}
