import { useNetworkCall } from "@/lib/hooks/useNetworkCall";
import { ReduxGate } from "@/lib/resync-components/ReduxGate";
import { initializeGameStateStore, setGame } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { GameId, GameType } from "@resync-games/api";
import { useRouter } from "next/navigation";
import { InitializeGlobalScreen } from "./InitializeGlobalScreen";

export const GlobalScreen = ({
  gameId,
  gameSlug
}: {
  gameId: GameId;
  gameSlug: GameType;
}) => {
  const router = useRouter();

  const { result: gameStateAndInfo } = useNetworkCall(
    () =>
      ClientServiceCallers.globalScreen.getGameState({
        gameId: gameId,
        gameType: gameSlug
      }),
    () => router.push("/")
  );
  if (gameStateAndInfo == null) {
    return;
  }

  const setInitialState = (dispatch: Dispatch<UnknownAction>) => {
    dispatch(setGame(gameStateAndInfo));
  };

  return (
    <ReduxGate
      createStore={initializeGameStateStore}
      initializeStore={setInitialState}
    >
      {(store) => (
        <InitializeGlobalScreen
          gameId={gameId}
          gameSlug={gameSlug}
          store={store}
        />
      )}
    </ReduxGate>
  );
};
