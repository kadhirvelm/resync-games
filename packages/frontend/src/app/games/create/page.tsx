"use client";

import { NavigationButton } from "@/lib/tiles-components/NavigationButton";
import dynamic from "next/dynamic";

export default function NavigateToGameCreate() {
  // Lazy load the game component only on the client-side
  const DynamicComponent = dynamic(
    () =>
      import("@resync-games/games").then((module) => {
        const { GAME_REGISTRY } = module;
        return () => (
          <div>
            {Object.entries(GAME_REGISTRY).map(([key, { slug, name }]) => (
              <div>
                <NavigationButton href={`/${slug}/create`} key={key}>
                  {name}
                </NavigationButton>
                <br></br>
              </div>
            ))}
          </div>
        );
      }),
    { ssr: false } // Disable server-side rendering
  );
  return (
    <div>
      <h1>Pick game to create</h1>
      <DynamicComponent />
    </div>
  );
}
