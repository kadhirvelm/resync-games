"use client";

import { GameStateHandler, GameStateReduxStore } from "@/redux";
import { Flex, Text } from "@radix-ui/themes";
import { GameId, GameType } from "@resync-games/api";
import { FrontendRegisteredGame } from "@resync-games/games/frontendRegistry";
import dynamic from "next/dynamic";
import { useContext, useMemo } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { GoHome } from "./components/GoHome";

export const GameEntry = ({
  store,
  gameId,
  gameSlug
}: {
  gameId: GameId;
  gameSlug: GameType;
  store: GameStateReduxStore;
}) => {
  const player = useContext(PlayerContext);

  const gameStateHandler = useMemo(() => {
    return new GameStateHandler(store, player);
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
    </>
  );
};
