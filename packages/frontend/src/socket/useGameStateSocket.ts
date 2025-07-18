import { PlayerContext } from "@/components/player/PlayerContext";
import { getSocketEmitter, registerSocketHandler } from "@/services/socket";
import {
  GameId,
  GameStateClientSocketDefinition,
  GameType
} from "@/imports/api";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import { useGameStateCallbacks } from "./useGameStateCallbacks";
import { EnvironmentContext } from "../context/Environment";

/**
 * Registers the socket and handles all of the initialization logic. It also ensures the right listeners
 * are connected.
 */
export function useGameStateSocket(gameId: GameId, gameType: GameType) {
  const { player } = useContext(PlayerContext);
  const { apiClientUrl } = useContext(EnvironmentContext);

  const [connectionStatus, setConnectionStatus] = useState(false);
  const socketIdentifier = useMemo(() => v4(), []);

  const socket = useMemo(() => {
    return io(apiClientUrl, {
      autoConnect: false
    });
  }, []);

  const socketEmitter = useMemo(
    () => getSocketEmitter(GameStateClientSocketDefinition, socket),
    [socket]
  );

  const connect = useCallback(() => {
    socketEmitter.identify({
      gameId,
      gameType,
      playerId: player.playerId,
      socketId: socketIdentifier
    });
  }, [socketEmitter, gameId, player.playerId, socketIdentifier]);

  const disconnect = useCallback(() => {
    setConnectionStatus(false);
  }, []);

  const callbacks = useGameStateCallbacks(socketIdentifier, {
    setConnectionStatus: setConnectionStatus
  });

  useEffect(() => {
    registerSocketHandler(GameStateClientSocketDefinition, socket, {
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
