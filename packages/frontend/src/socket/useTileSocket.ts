"use client";

import { useMemo, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";

export function useTileSocket() {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const socketIdentifier = useMemo(() => v4(), []);

  const socket = useMemo(() => {
    return io(process.env.NEXT_PUBLIC_API_CLIENT_URL ?? "");
  }, []);

  socket.on("connect", () => {
    socket.emit("identify", socketIdentifier);
  });

  socket.on("identify", (identifier) => {
    if (identifier !== socketIdentifier) {
      return;
    }

    setConnectionStatus(true);
  });

  socket.on("disconnect", () => {
    setConnectionStatus(false);
  });

  return { connectionStatus };
}
