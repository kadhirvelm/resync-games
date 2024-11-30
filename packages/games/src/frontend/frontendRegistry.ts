import { GAME_SLUGS } from "../shared/gamesRegistry";
import { MapGameConfiguration } from "./baseConfiguration";
import { PongHomePage } from "./pong/pong";
import { PongConfiguration } from "./pong/pongConfiguration";
import { DisplayMagicMazeGame } from "./snatchTheSnack/snatchTheSnack";
import { IGameStateHandler } from "@/redux";
import { SnatchTheSnackConfiguration } from "./snatchTheSnack/snatchTheSnackConfiguration";
import { TheStockTimesConfiguration } from "./theStockTimes/theStockTimesConfiguration";
import { DisplayTheStockTimes } from "./theStockTimes/theStockTimes";

export type FrontendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: FrontendRegisteredGame;
};

export interface FrontendGameComponentProps<
  GameState extends object = object,
  LocalGameState extends object = object
> {
  gameStateHandler: IGameStateHandler<GameState, LocalGameState>;
}

export interface FrontendRegisteredGame {
  gameConfiguration: MapGameConfiguration<object>;
  gameEntry: (
    properties: FrontendGameComponentProps
  ) => JSX.Element | undefined | null;
}

export const GAME_REGISTRY: FrontendGameRegistry = {
  pong: {
    gameConfiguration: PongConfiguration,
    gameEntry: PongHomePage
  },
  "snatch-the-snack": {
    gameConfiguration: SnatchTheSnackConfiguration,
    gameEntry: DisplayMagicMazeGame
  },
  "the-stock-times": {
    gameConfiguration: TheStockTimesConfiguration,
    gameEntry: DisplayTheStockTimes
  }
};
