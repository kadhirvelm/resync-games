"use client";

import { GameStateHandler, GameStateReduxStore } from "@/redux";
import { useGameStateSocket } from "@/socket/useGameStateSocket";
import { Flex, Text } from "@radix-ui/themes";
import { GameId, GameType } from "@resync-games/api";
import { FrontendRegisteredGame } from "@resync-games/games/frontendRegistry";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { GoHome } from "./components/GoHome";
import { SocketStatus } from "./components/SocketStatus";

export const GameEntry = ({
  store,
  gameId,
  gameSlug
}: {
  gameId: GameId;
  gameSlug: GameType;
  store: GameStateReduxStore;
}) => {
  const { connectionStatus } = useGameStateSocket(gameId);

  const gameStateHandler = useMemo(() => {
    return new GameStateHandler(store);
  }, [gameId]);

  // Lazy load the game component only on the client-side
  const DynamicComponent = dynamic(
    () =>
      import("@resync-games/games/frontendRegistry").then((module) => {
        const { GAME_REGISTRY } = module;
        const maybeGame = (
          GAME_REGISTRY as Record<string, FrontendRegisteredGame>
        )[gameSlug];

        if (maybeGame === undefined) {
          return () => (
            <Flex>
              <Text>The game you're looking for is not registered.</Text>
            </Flex>
          );
        }

        return maybeGame.gameEntry;
      }),
    { ssr: false } // Disable server-side rendering
  );

  return (
    <>
      <DynamicComponent gameStateHandler={gameStateHandler} />
      <GoHome />
      <SocketStatus connectionStatus={connectionStatus} />
    </>
  );
};
