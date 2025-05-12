"use client";

import { GlobalScreen } from "@/components/globalScreen/GlobalScreen";
import { GlobalScreenPlayerContextProvider } from "@/components/globalScreen/GlobalScreenPlayerContextProvider";
import { GameId, GameType } from "@/imports/api";
import { ClientGate } from "@/lib/ClientGate";
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
