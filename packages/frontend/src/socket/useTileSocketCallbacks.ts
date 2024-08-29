import {
  IdentifySocket,
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
  const identify = useCallback(
    (identify: IdentifySocket) => {
      if (identify.socketId !== socketIdentifier) {
        return;
      }

      setConnectionStatus(true);
    },
    [socketIdentifier, setConnectionStatus]
  );

  return {
    identify
  };
}
