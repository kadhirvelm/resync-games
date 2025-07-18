import { GameId } from "@/imports/api";
import { getGlobalScreenIdentifier } from "../player/browserIdentifier";
import { useMemo } from "react";
import { PlayerContext } from "../player/PlayerContext";

export const GlobalScreenPlayerContextProvider = ({
  children,
  gameId
}: {
  children: React.ReactNode;
  gameId: GameId;
}) => {
  const browserIdentifier = useMemo(() => getGlobalScreenIdentifier(), []);

  return (
    <PlayerContext.Provider
      value={{
        player: {
          avatarCollection: "thumbs",
          displayName: `Global screen - ${gameId}`,
          playerId: browserIdentifier
        },
        setPlayer: () => {}
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
