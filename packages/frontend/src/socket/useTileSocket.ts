"use client";

import { getSocketEmitter, registerSocketHandler } from "@/services/socket";
import { IdentifySocket, TileClientSocketDefinition } from "@tiles-tbd/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";

export function useTileSocket() {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const socketIdentifier = useMemo(() => v4(), []);

  const socket = useMemo(() => {
    return io(process.env.NEXT_PUBLIC_API_CLIENT_URL ?? "", {
      autoConnect: false
    });
  }, []);

  const socketEmitter = getSocketEmitter(TileClientSocketDefinition, socket);

  const connect = useCallback(() => {
    socketEmitter.identify({ socketId: socketIdentifier });
  }, [socketEmitter, socketIdentifier]);

  const disconnect = useCallback(() => {
    setConnectionStatus(false);
  }, []);

  const identify = useCallback(
    (identify: IdentifySocket) => {
      if (identify.socketId !== socketIdentifier) {
        return;
      }

      setConnectionStatus(true);
    },
    [socketIdentifier]
  );

  useEffect(() => {
    registerSocketHandler(TileClientSocketDefinition, socket, {
      connect,
      disconnect,
      identify
    });

    socket.connect();
  }, [socket, connect, disconnect, identify]);

  return { connectionStatus, socketEmitter };
}
