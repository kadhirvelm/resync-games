"use client";

import { AvailableGames } from "@/components/connectToGame/AvailableGames";
import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";

export default function Home() {
  return (
    <ClientGate>
      <PlayerContextProvider>
        <AvailableGames />
      </PlayerContextProvider>
    </ClientGate>
  );
}
