"use client";

import { useTileSocket } from "@/socket/useTileSocket";
import {
  CompleteTileMap as ICompleteTileMap,
  TileGameId
} from "@tiles-tbd/api";
import React from "react";
import { DisplayTiles } from "../DisplayTiles";
import { SocketStatus } from "../SocketStatus";
import { PawnMovement } from "./PawnMovement";
import { SelectPawn } from "./SelectPawn";
import { Flex } from "@/lib/radix/Flex";

export const TileMap = ({
  tileMap,
  tileGameId
}: {
  tileGameId: TileGameId;
  tileMap: ICompleteTileMap;
}) => {
  const { connectionStatus } = useTileSocket(tileGameId);

  return (
    <>
      <Flex direction="row" style={{ padding: "10px" }}>
        <DisplayTiles tiles={tileMap.tiles} />
      </Flex>
      <SelectPawn />
      <PawnMovement />
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};
