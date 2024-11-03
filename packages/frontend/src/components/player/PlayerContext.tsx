"use client";

import { useNetworkCall } from "@/lib/hooks/useNetworkCall";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { GameId, Player } from "@resync-games/api";
import { createContext, useMemo } from "react";
import { getBrowserIdentifier } from "./browserIdentifier";
import { SetPlayer } from "./SetPlayer";
import { Flex } from "@/lib/radix/Flex";
import styles from "./PlayerContext.module.scss";

export const PlayerContext = createContext<Player>({
  displayName: "",
  playerId: ""
} as Player);

export const PlayerContextProvider = ({
  children,
  gameId
}: {
  children: React.ReactNode;
  gameId?: GameId;
}) => {
  const browserIdentifier = useMemo(() => getBrowserIdentifier(), []);

  const { result: player, setResult } = useNetworkCall(() =>
    ClientServiceCallers.user.me({
      playerId: browserIdentifier
    })
  );

  if (player == null) {
    return <SetPlayer onSetPlayer={setResult} />;
  }

  return (
    <PlayerContext.Provider value={player}>
      {children}
      <Flex className={styles.playerContainer}>
        <SetPlayer
          existingPlayer={player}
          gameId={gameId}
          onSetPlayer={setResult}
        />
      </Flex>
    </PlayerContext.Provider>
  );
};
