import { IGameStateHandler } from "@/redux";
import { JSX } from "react";
import { GAME_SLUGS } from "../shared/gamesRegistry";
import { MapGameConfiguration } from "./baseConfiguration";
import { DisplayFishbowl } from "./fishbowl/DisplayFishbowl";
import { FishbowlConfiguration } from "./fishbowl/FishbowlConfiguration";
import { PongConfiguration } from "./pong/pongConfiguration";
import { DisplayTheStockTimes } from "./theStockTimes/DisplayTheStockTimes";
import { StockTimesGlobalScreen } from "./theStockTimes/StockTimesGlobalScreen";
import { StockTimesTutorial } from "./theStockTimes/StockTimesTutorial";
import { INITIAL_THE_STOCK_TIMES_LOCAL_STATE } from "./theStockTimes/store/theStockTimesLocalState";
import { TheStockTimesConfiguration } from "./theStockTimes/theStockTimesConfiguration";
import { INITIAL_FISHBOWL_LOCAL_STATE } from "./fishbowl/store/fishbowlLocalState";
import dynamic from "next/dynamic";
import { FishbowlGlobalScreen } from "./fishbowl/FishbowlGlobalScreen";
import { TriviaConfiguration } from "./trivia/TriviaConfiguration";
import { INITIAL_TRIVIA_LOCAL_STATE } from "./trivia/store/triviaLocalState";
import { DisplayTrivia } from "./trivia/DisplayTrivia";
import { TriviaGlobalScreen } from "./trivia/TrivialGlobalScreen";
import { FishbowlTutorial } from "./fishbowl/FishbowlTutorial";

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

/**
 * The team configuration for the game.
 * 2-teams: The game will have 2 teams.
 * no-teams: The game will have no teams.
 */
export type ResyncTeamConfiguration = "2-teams" | "no-teams";

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
   * The team configuration for the game. Default is 2-teams.
   */
  teamConfiguration?: ResyncTeamConfiguration;
  /**
   * Dispays how to play the game.
   */
  tutorialScreen?: (properties: {
    gameConfiguration: object;
  }) => JSX.Element | undefined | null;
}

/**
 * For games that require phaser, we cannot use SSR. They require the window variable and need to be ommitted from the nextjs server load.
 */
const PongHomePageWithoutSSR = dynamic<FrontendGameComponentProps>(
  () => import("./pong/pong"),
  {
    ssr: false
  }
);

export const GAME_REGISTRY: FrontendGameRegistry = {
  fishbowl: {
    gameConfiguration: FishbowlConfiguration,
    gameEntry: DisplayFishbowl,
    globalScreen: FishbowlGlobalScreen,
    initialLocalState: INITIAL_FISHBOWL_LOCAL_STATE,
    tutorialScreen: FishbowlTutorial
  },
  pong: {
    gameConfiguration: PongConfiguration,
    gameEntry: (props) => <PongHomePageWithoutSSR {...props} />,
    initialLocalState: undefined
  },
  "the-stock-times": {
    gameConfiguration: TheStockTimesConfiguration,
    gameEntry: DisplayTheStockTimes,
    globalScreen: StockTimesGlobalScreen,
    initialLocalState: INITIAL_THE_STOCK_TIMES_LOCAL_STATE,
    tutorialScreen: StockTimesTutorial
  },
  trivia: {
    gameConfiguration: TriviaConfiguration,
    gameEntry: DisplayTrivia,
    globalScreen: TriviaGlobalScreen,
    initialLocalState: INITIAL_TRIVIA_LOCAL_STATE
  }
};
