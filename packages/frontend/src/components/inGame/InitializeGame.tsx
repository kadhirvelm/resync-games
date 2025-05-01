import { GameStateReduxStore, useGameStateSelector } from "@/redux";
import { useGameStateSocket } from "@/socket/useGameStateSocket";
import { GameId, GameType } from "@/imports/api";
import { GameEntry } from "./GameEntry";
import { GameLobby } from "./GameLobby";
import { SocketStatus } from "./components/SocketStatus";

export const InitializeGame = ({
  gameId,
  gameSlug,
  store
}: {
  gameId: GameId;
  gameSlug: GameType;
  store: GameStateReduxStore;
}) => {
  // This line has to be rendered inside of the ReduxGate so it can dispatch its updates accordingly
  const { connectionStatus } = useGameStateSocket(gameId, gameSlug);
  const currentGameState = useGameStateSelector(
    (s) => s.gameStateSlice.gameInfo?.currentGameState
  );

  const renderCurrentGameState = () => {
    if (currentGameState === undefined) {
      return;
    }

    if (currentGameState === "waiting") {
      return <GameLobby />;
    }

    return <GameEntry gameId={gameId} gameSlug={gameSlug} store={store} />;
  };

  return (
    <>
      {renderCurrentGameState()}
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};
