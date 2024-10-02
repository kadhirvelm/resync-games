"use client";

import { useTileSocket } from "@/socket/useTileSocket";
import { TileGameId } from "@resync-games/api";
import React from "react";
import { DynamicMagicMazeGame } from "../DisplayTiles";
import { SocketStatus } from "../SocketStatus";
import { PawnMovement } from "./PawnMovement";
import { SelectPawn } from "./SelectPawn";
import { Flex } from "@/lib/radix/Flex";
import { GoHome } from "./GoHome";

export const TileMap = ({ tileGameId }: { tileGameId: TileGameId }) => {
  const { connectionStatus } = useTileSocket(tileGameId);

  return (
    <>
      <Flex direction="row" style={{ padding: "10px" }}>
        <DynamicMagicMazeGame />
      </Flex>
      <GoHome />
      <SelectPawn />
      <PawnMovement />
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};
