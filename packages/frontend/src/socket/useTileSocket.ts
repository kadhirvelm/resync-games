"use client";

import { getSocketEmitter, registerSocketHandler } from "@/services/socket";
import { TileClientSocketDefinition } from "@tiles-tbd/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import { useTileSocketCallbacks } from "./useTileSocketCallbacks";

/**
 * Registers the socket and handles all of the initialization logic. It also ensures the right listeners
 * are connected.
 */
export function useTileSocket() {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const socketIdentifier = useMemo(() => v4(), []);

  const socket = useMemo(() => {
    return io(process.env.NEXT_PUBLIC_API_CLIENT_URL ?? "", {
      autoConnect: false
    });
  }, []);

  const socketEmitter = useMemo(
    () => getSocketEmitter(TileClientSocketDefinition, socket),
    [socket]
  );

  const connect = useCallback(() => {
    socketEmitter.identify({ socketId: socketIdentifier });
  }, [socketEmitter, socketIdentifier]);

  const disconnect = useCallback(() => {
    setConnectionStatus(false);
  }, []);

  const callbacks = useTileSocketCallbacks(socketIdentifier, {
    setConnectionStatus: setConnectionStatus
  });

  useEffect(() => {
    registerSocketHandler(TileClientSocketDefinition, socket, {
      connect,
      disconnect,
      ...callbacks
    });

    socket.connect();
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { connectionStatus, socketEmitter };
}
