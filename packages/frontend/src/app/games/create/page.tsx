"use client";

import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";
import { lazy } from "react";
import { EnvironmentContextProvider } from "../../../context/Environment";

const CreateGame = lazy(() => import("@/components/createGame/CreateGame"));

export default function NavigateToGameCreate() {
  return (
    <ClientGate>
      <EnvironmentContextProvider>
        <PlayerContextProvider>
          <CreateGame />
        </PlayerContextProvider>
      </EnvironmentContextProvider>
    </ClientGate>
  );
}
