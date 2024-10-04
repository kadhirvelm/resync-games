export type GameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: RegisteredGame;
};

export const GAME_SLUGS = ["pong", "snatch-the-snack"] as const;

export interface RegisteredGame {
  name: string;
}

export const GAME_REGISTRY: GameRegistry = {
  pong: {
    name: "Pong"
  },
  "snatch-the-snack": {
    name: "Snatch the Snack"
  }
};
