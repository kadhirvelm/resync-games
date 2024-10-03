import { GAME_SLUGS } from "../gamesRegistry";
import { PongHomePage } from "./pong/pong";
import { DisplayMagicMazeGame } from "./snatchTheSnack/snatchTheSnack";

export type FrontendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: FrontendRegisteredGame;
};

export interface FrontendRegisteredGame {
  gameEntry: () => JSX.Element;
}

export const GAME_REGISTRY: FrontendGameRegistry = {
  pong: {
    gameEntry: PongHomePage
  },
  "snatch-the-snack": {
    gameEntry: DisplayMagicMazeGame
  }
};
