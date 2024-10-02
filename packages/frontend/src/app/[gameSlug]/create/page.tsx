"use client";

import dynamic from "next/dynamic";

export default function Page({ params }: { params: { gameSlug: string } }) {
  const { gameSlug } = params;

  // Lazy load the game component only on the client-side
  const DynamicComponent = dynamic(
    () =>
      import("@resync-games/games").then((module) => {
        const { slugToGameKey, GAME_FRONTEND_REGISTRY } = module;
        const gameKey = slugToGameKey(gameSlug);

        if (!gameKey) {
          throw new Error("Game not found");
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const component = GAME_FRONTEND_REGISTRY[gameKey]!;
        return component;
      }),
    { ssr: false } // Disable server-side rendering
  );

  return (
    <div>
      <DynamicComponent />
    </div>
  );
}
