"use client";

import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";
import { lazy } from "react";

const CreateGame = lazy(() => import("@/components/createGame/CreateGame"));

export default function NavigateToGameCreate() {
  return (
    <ClientGate>
      <PlayerContextProvider>
        <CreateGame />
      </PlayerContextProvider>
    </ClientGate>
  );
}
