"use client";

import { GameStateReduxStore } from "@/redux";
import { useGameStateSocket } from "@/socket/useGameStateSocket";
import { GameStateAndInfo, GameType } from "@resync-games/api";
import { GameEntry } from "./GameEntry";
import { GameLobby } from "./GameLobby";
import { SocketStatus } from "./components/SocketStatus";

export const InitializeGame = ({
  gameStateAndInfo,
  gameSlug,
  store
}: {
  gameSlug: GameType;
  gameStateAndInfo: GameStateAndInfo;
  store: GameStateReduxStore;
}) => {
  // This line has to be rendered inside of the ReduxGate so it can dispatch its updates accordingly
  const { connectionStatus } = useGameStateSocket(gameStateAndInfo.gameId);

  const renderCurrentGameState = () => {
    if (gameStateAndInfo.currentGameState === "waiting") {
      return <GameLobby />;
    }

    return (
      <GameEntry
        gameId={gameStateAndInfo.gameId}
        gameSlug={gameSlug}
        store={store}
      />
    );
  };

  return (
    <>
      {renderCurrentGameState()}
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};
