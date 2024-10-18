"use client";

import { AvailableGames } from "@/components/connectToGame/AvailableGames";
import { PlayerContextProvider } from "@/components/player/PlayerContext";

export default function Home() {
  return (
    <PlayerContextProvider>
      <AvailableGames />
    </PlayerContextProvider>
  );
}
