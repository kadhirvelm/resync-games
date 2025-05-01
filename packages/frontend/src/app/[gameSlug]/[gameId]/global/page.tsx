"use client";

import { GlobalScreenPlayerContextProvider } from "@/components/globalScreen/GlobalScreenPlayerContextProvider";
import { ClientGate } from "@/lib/ClientGate";
import { GameId, GameType } from "@/imports/api";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const GlobalScreenWithoutSSR = dynamic(
  () => import("@/components/globalScreen/GlobalScreen"),
  { ssr: false }
);

export default function Page() {
  const { gameSlug, gameId } = useParams<{
    gameId: GameId;
    gameSlug: GameType;
  }>();

  return (
    <ClientGate>
      <GlobalScreenPlayerContextProvider gameId={gameId}>
        <GlobalScreenWithoutSSR gameId={gameId} gameSlug={gameSlug} />
      </GlobalScreenPlayerContextProvider>
    </ClientGate>
  );
}
