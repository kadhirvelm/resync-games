import { useNetworkCall } from "@/lib/hooks/useNetworkCall";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { GameId, GameType } from "@resync-games/api";
import { useRouter } from "next/navigation";
import { Dispatch, useContext } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { InitializeGame } from "./InitializeGame";
import { ReduxGate } from "@/lib/resync-components/ReduxGate";
import {
  setGame,
  initializeGameStateStore,
  setLocalState,
  setPlayer
} from "@/redux";
import { UnknownAction } from "@reduxjs/toolkit";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";

const GetGameState = ({
  gameId,
  gameSlug
}: {
  gameId: GameId;
  gameSlug: GameType;
}) => {
  const router = useRouter();
  const player = useContext(PlayerContext);

  const { result: gameStateAndInfo } = useNetworkCall(
    () =>
      ClientServiceCallers.gameState.getGameState({
        gameId: gameId,
        gameType: gameSlug,
        playerId: player.playerId
      }),
    () => router.push("/")
  );

  if (gameStateAndInfo == null) {
    return;
  }

  const setInitialState = (dispatch: Dispatch<UnknownAction>) => {
    const frontendGame = getFrontendGame(gameSlug);

    dispatch(setGame(gameStateAndInfo));
    dispatch(setLocalState(frontendGame.initialLocalState));
    dispatch(setPlayer(player));
  };

  return (
    <ReduxGate
      createStore={initializeGameStateStore}
      initializeStore={setInitialState}
    >
      {(store) => (
        <InitializeGame
          gameId={gameStateAndInfo.gameId}
          gameSlug={gameSlug}
          store={store}
        />
      )}
    </ReduxGate>
  );
};

export default GetGameState;
