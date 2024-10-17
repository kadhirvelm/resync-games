"use client";

import CreateGame from "@/components/createGame/CreateGame";
import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";

export default function NavigateToGameCreate() {
  return (
    <ClientGate>
      <PlayerContextProvider>
        <CreateGame />
      </PlayerContextProvider>
    </ClientGate>
  );
}
