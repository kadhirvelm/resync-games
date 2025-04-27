import { IGameStateHandler } from "@/redux";
import { JSX } from "react";
import { GAME_SLUGS } from "../shared/gamesRegistry";
import { MapGameConfiguration } from "./baseConfiguration";
import { PongHomePage } from "./pong/pong";
import { PongConfiguration } from "./pong/pongConfiguration";
import { DisplayTheStockTimes } from "./theStockTimes/DisplayTheStockTimes";
import { StockTimesGlobalScreen } from "./theStockTimes/StockTimesGlobalScreen";
import { StockTimesTutorial } from "./theStockTimes/StockTimesTutorial";
import { INITIAL_THE_STOCK_TIMES_LOCAL_STATE } from "./theStockTimes/store/theStockTimesLocalState";
import { TheStockTimesConfiguration } from "./theStockTimes/theStockTimesConfiguration";

export type FrontendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: FrontendRegisteredGame;
};

export interface FrontendGameComponentProps<
  GameState extends object = object,
  LocalGameState extends object = object
> {
  gameStateHandler: IGameStateHandler<GameState, LocalGameState>;
  isMobile: boolean;
}

export interface GlobalScreenComponentProps<
  GameState extends object = object,
  LocalGameState extends object = object
> {
  gameStateHandler: IGameStateHandler<GameState, LocalGameState>;
}

export interface FrontendRegisteredGame {
  /**
   * The configuration by the user for the game.
   */
  gameConfiguration: MapGameConfiguration<object>;
  /**
   * The primary entry point for the game.
   */
  gameEntry: (
    properties: FrontendGameComponentProps
  ) => JSX.Element | undefined | null;
  /**
   * The screen to display on a central screen when the game is playing. Receives the state from the socket.
   */
  globalScreen?: (
    properties: GlobalScreenComponentProps
  ) => JSX.Element | undefined | null;
  /**
   * The initial local state for the game, dispatches before the game initializes.
   */
  initialLocalState: object | undefined;
  /**
   * Dispays how to play the game.
   */
  tutorialScreen?: (properties: {
    gameConfiguration: object;
  }) => JSX.Element | undefined | null;
}

export const GAME_REGISTRY: FrontendGameRegistry = {
  pong: {
    gameConfiguration: PongConfiguration,
    gameEntry: PongHomePage,
    initialLocalState: undefined
  },
  "the-stock-times": {
    gameConfiguration: TheStockTimesConfiguration,
    gameEntry: DisplayTheStockTimes,
    globalScreen: StockTimesGlobalScreen,
    initialLocalState: INITIAL_THE_STOCK_TIMES_LOCAL_STATE,
    tutorialScreen: StockTimesTutorial
  }
};
