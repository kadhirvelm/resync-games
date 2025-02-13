export type GameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: RegisteredGame;
};

export const GAME_SLUGS = [
  "pong",
  "snatch-the-snack",
  "the-stock-times"
] as const;

export interface GameTags {
  /**
   * If true, the "in development" tag will not be displayed.
   */
  completed?: boolean;
}

export interface RegisteredGame {
  description: string;
  /**
   * Tags for the game.
   */
  gameTags: GameTags;
  name: string;
  version: string;
}

export const GAME_REGISTRY: GameRegistry = {
  pong: {
    description: "Classic pong, with a multiplayer twist.",
    gameTags: {},
    name: "Pong",
    version: "1.0.0"
  },
  "snatch-the-snack": {
    description:
      "A game of speed and strategy to see which team can capture the snacks first.",
    gameTags: {},
    name: "Snatch the Snack",
    version: "1.0.0"
  },
  "the-stock-times": {
    description:
      "A stock market simulation game. Which team can make the most money?",
    gameTags: {
      completed: true
    },
    name: "The Stock Times",
    version: "1.0.0"
  }
};
