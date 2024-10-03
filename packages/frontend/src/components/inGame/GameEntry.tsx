"use client";

import { useGameStateSocket } from "@/socket/useGameStateSocket";
import { initializeTileStore } from "@/stores/gameState/gameStateStore";
import { GameStateReduxStore } from "@/stores/gameStateStore";
import { Flex, Text } from "@radix-ui/themes";
import { GameId, GameType } from "@resync-games/api";
import { FrontendRegisteredGame } from "@resync-games/games/dist/frontend";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { SocketStatus } from "./components/SocketStatus";
import { GoHome } from "./components/GoHome";
import { PawnMovement } from "./components/PawnMovement";
import { SelectPawn } from "./components/SelectPawn";

export const GameEntry = ({
  store,
  gameId,
  gameSlug
}: {
  gameId: GameId;
  gameSlug: GameType;
  store: ReturnType<typeof initializeTileStore>;
}) => {
  const { connectionStatus } = useGameStateSocket(gameId);

  const reduxStore = useMemo(() => new GameStateReduxStore(store), [gameId]);

  // Lazy load the game component only on the client-side
  const DynamicComponent = dynamic(
    () =>
      import("@resync-games/games/dist/frontend").then((module) => {
        const { GAME_REGISTRY } = module;
        const mayeGame = (
          GAME_REGISTRY as Record<string, FrontendRegisteredGame>
        )[gameSlug];

        if (mayeGame === undefined) {
          return () => (
            <Flex>
              <Text>The game you're looking for is not registered.</Text>
            </Flex>
          );
        }

        console.log(reduxStore);

        // gameStateAndInfo - separated
        // onUpdateGameState

        return mayeGame.gameEntry;
      }),
    { ssr: false } // Disable server-side rendering
  );

  return (
    <>
      <DynamicComponent />
      <GoHome />
      <SelectPawn />
      <PawnMovement />
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};
