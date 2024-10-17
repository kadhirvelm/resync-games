"use client";

import { ClientServiceCallers } from "@/services/serviceCallers";
import { isServiceError, Player } from "@resync-games/api";
import { createContext, useEffect, useMemo, useState } from "react";
import { getBrowserIdentifier } from "./browserIdentifier";
import { SetPlayer } from "./SetPlayer";

export const PlayerContext = createContext<Player>({
  displayName: "",
  playerId: ""
} as Player);

export const PlayerContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const browserIdentifier = useMemo(() => getBrowserIdentifier(), []);

  const [player, setPlayer] = useState<Player | null>(null);

  const checkForPlayer = async () => {
    const player = await ClientServiceCallers.user.me({
      playerId: browserIdentifier
    });

    if (isServiceError(player)) {
      return;
    }

    setPlayer(player);
  };

  useEffect(() => {
    checkForPlayer();
  }, []);

  if (player == null) {
    return <SetPlayer onSetPlayer={setPlayer} />;
  }

  return (
    <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
  );
};
