import { useNetworkCall } from "@/lib/hooks/useNetworkCall";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { GameId, Player } from "@/imports/api";
import { createContext, useMemo } from "react";
import { getBrowserIdentifier } from "./browserIdentifier";
import { SetPlayer } from "./SetPlayer";
import { Spinner, Flex } from "@/lib/radix";
import styles from "./PlayerContext.module.scss";
import { useNavigateToGame } from "@/lib/hooks/useNavigateToGame";

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

  const {
    result: player,
    setResult,
    hasInitialized
  } = useNetworkCall(() =>
    ClientServiceCallers.user.me({
      playerId: browserIdentifier
    })
  );

  const { isLoading } = useNavigateToGame(player);

  if (!hasInitialized) {
    return (
      <Flex align="center" flex="1" justify="center">
        <Spinner />
      </Flex>
    );
  }

  if (player == null) {
    return <SetPlayer onSetPlayer={setResult} />;
  }

  return (
    <PlayerContext.Provider value={player}>
      {isLoading ? <Spinner /> : children}
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
