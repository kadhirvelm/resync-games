import { updatePawns } from "@/stores/tiles/pawnState";
import { useTileDispatch } from "@/stores/tiles/tilesStore";
import {
  IdentifySocket,
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
      dispatch(updatePawns(newPawnState.pawnState));
    },
    [dispatch]
  );

  return {
    identify,
    updatePawnState
  };
}
