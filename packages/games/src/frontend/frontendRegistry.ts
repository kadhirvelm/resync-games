import { GAME_SLUGS } from "../shared/gamesRegistry";
import { PongHomePage } from "./pong/pong";
import { DisplayMagicMazeGame } from "./snatchTheSnack/snatchTheSnack";
import { IGameStateHandler } from "@/redux";

export type FrontendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: FrontendRegisteredGame;
};

export interface FrontendGameComponentProps {
  gameStateHandler: IGameStateHandler;
}

export interface FrontendRegisteredGame {
  gameEntry: (properties: FrontendGameComponentProps) => JSX.Element;
}

export const GAME_REGISTRY: FrontendGameRegistry = {
  pong: {
    gameEntry: PongHomePage
  },
  "snatch-the-snack": {
    gameEntry: DisplayMagicMazeGame
  }
};
