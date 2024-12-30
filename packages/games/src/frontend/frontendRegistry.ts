import { GAME_SLUGS } from "../shared/gamesRegistry";
import { MapGameConfiguration } from "./baseConfiguration";
import { PongHomePage } from "./pong/pong";
import { PongConfiguration } from "./pong/pongConfiguration";
import { DisplayMagicMazeGame } from "./snatchTheSnack/snatchTheSnack";
import { IGameStateHandler } from "@/redux";
import { SnatchTheSnackConfiguration } from "./snatchTheSnack/snatchTheSnackConfiguration";
import { TheStockTimesConfiguration } from "./theStockTimes/theStockTimesConfiguration";
import { DisplayTheStockTimes } from "./theStockTimes/DisplayTheStockTimes";
import { JSX } from "react";
import { INITIAL_SNATCH_THE_SNACK_LOCAL_STATE } from "./snatchTheSnack/store/snatchTheSnackLocalState";
import { INITIAL_THE_STOCK_TIMES_LOCAL_STATE } from "./theStockTimes/store/theStockTimesLocalState";
import { StockTimesGlobalScreen } from "./theStockTimes/StockTimesGlobalScreen";

export type FrontendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: FrontendRegisteredGame;
};

export interface FrontendGameComponentProps<
  GameState extends object = object,
  LocalGameState extends object = object
> {
  gameStateHandler: IGameStateHandler<GameState, LocalGameState>;
}

export interface GlobalScreenComponentProps<
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
  globalScreen?: (
    properties: GlobalScreenComponentProps
  ) => JSX.Element | undefined | null;
  initialLocalState: object | undefined;
}

export const GAME_REGISTRY: FrontendGameRegistry = {
  pong: {
    gameConfiguration: PongConfiguration,
    gameEntry: PongHomePage,
    initialLocalState: undefined
  },
  "snatch-the-snack": {
    gameConfiguration: SnatchTheSnackConfiguration,
    gameEntry: DisplayMagicMazeGame,
    initialLocalState: INITIAL_SNATCH_THE_SNACK_LOCAL_STATE
  },
  "the-stock-times": {
    gameConfiguration: TheStockTimesConfiguration,
    gameEntry: DisplayTheStockTimes,
    globalScreen: StockTimesGlobalScreen,
    initialLocalState: INITIAL_THE_STOCK_TIMES_LOCAL_STATE
  }
};
