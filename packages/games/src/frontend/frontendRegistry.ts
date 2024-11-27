import { GAME_SLUGS } from "../shared/gamesRegistry";
import { MapGameConfiguration } from "./baseConfiguration";
import { PongHomePage } from "./pong/pong";
import { PongConfiguration } from "./pong/pongConfiguration";
import { DisplayMagicMazeGame } from "./snatchTheSnack/snatchTheSnack";
import { IGameStateHandler } from "@/redux";
import { SnatchTheSnackConfiguration } from "./snatchTheSnack/snatchTheSnackConfiguration";

export type FrontendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: FrontendRegisteredGame;
};

export interface FrontendGameComponentProps {
  gameStateHandler: IGameStateHandler;
}

export interface FrontendRegisteredGame {
  gameConfiguration: MapGameConfiguration<object>;
  gameEntry: (properties: FrontendGameComponentProps) => JSX.Element;
}

export const GAME_REGISTRY: FrontendGameRegistry = {
  pong: {
    gameConfiguration: PongConfiguration,
    gameEntry: PongHomePage
  },
  "snatch-the-snack": {
    gameConfiguration: SnatchTheSnackConfiguration,
    gameEntry: DisplayMagicMazeGame
  }
};
