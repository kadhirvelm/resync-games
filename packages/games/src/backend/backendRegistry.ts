import { GAME_SLUGS } from "../gamesRegistry";
import { IGameServer } from "./base";
import { PongGameServer } from "./pong/pong";
import { SnatchTheSnackServer } from "./snatch-the-snack/snatchTheSnack";

export type BackendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: BackendRegisteredGame;
};

export interface BackendRegisteredGame {
  gameServer: IGameServer;
}

export const BACKEND_GAME_REGISTRY: BackendGameRegistry = {
  pong: {
    gameServer: new PongGameServer()
  },
  "snatch-the-snack": {
    gameServer: new SnatchTheSnackServer()
  }
};
