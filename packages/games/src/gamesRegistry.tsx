import { PongHomePage } from "./frontend/pong/pong";
import { DisplayMagicMazeGame } from "./frontend/snatchTheSnack/snatchTheSnack";

type GameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: RegisteredGame;
};

export interface RegisteredGame {
  gameEntry: () => JSX.Element;
  name: string;
}

const GAME_SLUGS = ["pong", "snatch-the-snack"] as const;

export const GAME_REGISTRY: GameRegistry = {
  pong: {
    gameEntry: PongHomePage,
    name: "Pong"
  },
  "snatch-the-snack": {
    gameEntry: DisplayMagicMazeGame,
    name: "Snatch the Snack"
  }
};
