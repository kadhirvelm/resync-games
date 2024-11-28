export type GameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: RegisteredGame;
};

export const GAME_SLUGS = ["pong", "snatch-the-snack"] as const;

export interface RegisteredGame {
  name: string;
  version: string;
}

export const GAME_REGISTRY: GameRegistry = {
  pong: {
    name: "Pong",
    version: "1.0.0"
  },
  "snatch-the-snack": {
    name: "Snatch the Snack",
    version: "1.0.0"
  }
};
