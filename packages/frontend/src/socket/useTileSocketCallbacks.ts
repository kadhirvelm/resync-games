import { setPawns } from "@/stores/tiles/pawnState";
import { setGame } from "@/stores/tiles/tileGameState";
import { useTileDispatch } from "@/stores/tiles/tilesStore";
import {
  IdentifySocket,
  NewGameState,
  NewPawnState,
  RemoveExtendsString,
  SocketEmitter,
  TileFromServerToClient
} from "@tiles-tbd/api";
import { useCallback } from "react";

/**
 * Handles creating all the listener callbacks for the socket. These are all the messages that could come from the server.
 */
export function useTileSocketCallbacks(
  socketIdentifier: string,
  { setConnectionStatus }: { setConnectionStatus: (status: boolean) => void }
): SocketEmitter<RemoveExtendsString<TileFromServerToClient>> {
  const dispatch = useTileDispatch();

  const identify = useCallback(
    (identify: IdentifySocket) => {
      if (identify.socketId !== socketIdentifier) {
        return;
      }

      setConnectionStatus(true);
    },
    [socketIdentifier, setConnectionStatus]
  );

  const updatePawnState = useCallback(
    (newPawnState: NewPawnState) => {
      dispatch(setPawns(newPawnState.pawnState));
    },
    [dispatch]
  );

  const updateGameState = useCallback(
    (newGameState: NewGameState) => {
      dispatch(setGame(newGameState.gameState));
    },
    [dispatch]
  );

  return {
    identify,
    updatePawnState,
    updateGameState,
  };
}
