"use client";

import { Flex } from "@/lib/radix/Flex";
import { useGameStateSocket } from "@/socket/useGameStateSocket";
import { GameId } from "@resync-games/api";
import { DynamicMagicMazeGame } from "../DisplayTiles";
import { SocketStatus } from "../SocketStatus";
import { GoHome } from "./GoHome";
import { PawnMovement } from "./PawnMovement";
import { SelectPawn } from "./SelectPawn";

export const TileMap = ({ gameId }: { gameId: GameId }) => {
  const { connectionStatus } = useGameStateSocket(gameId);

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
