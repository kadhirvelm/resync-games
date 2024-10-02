import { IGameServer } from "./backend/base";
import { PongGameServer } from "./backend/pong";
import { PongHomePage } from "./frontend/pong";

export const GAME_REGISTRY: Record<string, { name: string; slug: string }> = {
  pong: {
    name: "Pong",
    slug: "pong"
  },
  snatchTheSnack: {
    name: "Snatch the Snack",
    slug: "snatch-the-snack"
  }
};

export function slugToGameKey(slug: string): string | undefined {
  return Object.entries(GAME_REGISTRY).find(
    ([, { slug: gameSlug }]) => gameSlug === slug
  )?.[0];
}

export const GAME_BACKEND_REGISTRY: Record<string, IGameServer> = {
  pong: new PongGameServer()
};

export const GAME_FRONTEND_REGISTRY: Record<string, () => JSX.Element> = {
  pong: PongHomePage
};
