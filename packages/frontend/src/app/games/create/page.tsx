"use client";

import { NavigationButton } from "@/lib/tiles-components/NavigationButton";
import { GAME_REGISTRY } from "@resync-games/games";

export default function NavigateToGameCreate() {
  return (
    <div>
      <h1>Pick game to create</h1>
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
}
