"use client";

import { Flex } from "@/lib/radix/Flex";
import { Text } from "@radix-ui/themes";
import { RegisteredGame } from "@resync-games/games";
import dynamic from "next/dynamic";

export default function Page({ params }: { params: { gameSlug: string } }) {
  const { gameSlug } = params;

  // Lazy load the game component only on the client-side
  const DynamicComponent = dynamic(
    () =>
      import("@resync-games/games").then((module) => {
        const { GAME_REGISTRY } = module;
        const mayeGame = (GAME_REGISTRY as Record<string, RegisteredGame>)[
          gameSlug
        ];

        if (mayeGame === undefined) {
          return () => (
            <Flex>
              <Text>The game you're looking for is not registered.</Text>
            </Flex>
          );
        }

        return mayeGame.gameEntry;
      }),
    { ssr: false } // Disable server-side rendering
  );

  return (
    <div>
      <DynamicComponent />
    </div>
  );
}
