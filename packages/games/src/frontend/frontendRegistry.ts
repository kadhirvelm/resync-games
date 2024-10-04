import { GameInfo } from "@resync-games/api";
import { GAME_SLUGS } from "../shared/gamesRegistry";
import { PongHomePage } from "./pong/pong";
import { DisplayMagicMazeGame } from "./snatchTheSnack/snatchTheSnack";
import { IGameStateHandler } from "@resync-games/redux-store";

export type FrontendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: FrontendRegisteredGame;
};

export interface FrontendGameComponentProps {
  gameInfo: GameInfo | undefined;
  gameState: object | undefined;
  gameStateHandler: IGameStateHandler;
  localState: object | undefined;
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
