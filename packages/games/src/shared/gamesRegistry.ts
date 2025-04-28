export type GameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: RegisteredGame;
};

export const GAME_SLUGS = ["pong", "fishbowl", "the-stock-times"] as const;

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
  fishbowl: {
    description:
      "A game where you have to guess words based on the clues given by your teammates. The kinds of clues given by your teammates changes every round.",
    gameTags: {},
    name: "Fishbowl",
    version: "1.0.0"
  },
  pong: {
    description: "Classic pong, with a multiplayer twist.",
    gameTags: {},
    name: "Pong",
    version: "1.0.0"
  },
  "the-stock-times": {
    description:
      "YOLO bet on generated stocks using 'the daily news' to guess which stocks are going to the moon. Which team can make the most money?",
    gameTags: {
      completed: true
    },
    name: "The Stock Times",
    version: "1.0.0"
  }
};
