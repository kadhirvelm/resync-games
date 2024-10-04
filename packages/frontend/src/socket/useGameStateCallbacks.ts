import { setGame, useGameStateDispatch } from "@/stores";
import {
  GameStateAndInfo,
  GameStateFromServerToClient,
  IdentifyPlayerSocket,
  RemoveExtendsString,
  SocketEmitter
} from "@resync-games/api";
import { useCallback } from "react";

/**
 * Handles creating all the listener callbacks for the socket. These are all the messages that could come from the server.
 */
export function useGameStateCallbacks(
  socketIdentifier: string,
  { setConnectionStatus }: { setConnectionStatus: (status: boolean) => void }
): SocketEmitter<RemoveExtendsString<GameStateFromServerToClient>> {
  const dispatch = useGameStateDispatch();

  const identify = useCallback(
    (identify: IdentifyPlayerSocket) => {
      if (identify.socketId !== socketIdentifier) {
        return;
      }

      setConnectionStatus(true);
    },
    [socketIdentifier, setConnectionStatus]
  );

  const emitUpdatedGameState = useCallback(
    (newGameState: GameStateAndInfo) => {
      dispatch(setGame(newGameState));
    },
    [dispatch]
  );

  return {
    emitUpdatedGameState,
    identify
  };
}
