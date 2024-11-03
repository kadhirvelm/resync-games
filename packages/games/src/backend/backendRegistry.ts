import { GAME_SLUGS } from "../shared/gamesRegistry";
import { IGameServer } from "./base";
import { PongGameServer } from "./pong/pong";
import { SnatchTheSnackServer } from "./snatch-the-snack/snatchTheSnack";

export type BackendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: BackendRegisteredGame;
};

export type AvailableGameType = (typeof GAME_SLUGS)[number];

export type StateReconcilerMethod = "top-level" | "closest";

export interface BackendRegisteredGame {
  /**
   * The game server for the game. This is where the game logic is implemented.
   */
  gameServer: IGameServer<never>;
  /**
   * Defaults to "top-level", which will accept changes based on the most updated top-level
   * lastUpdatedAt timestamp. This will get automatically added by the server on all state
   * changes.
   *
   * The "closest" method will accept changes based on the most updated lastUpdatedAt
   * timestamp, recursively checking through the nested object. Doing a depth first search
   * through the object's keys, it will reconcile state changes based on which object has
   * the most updated lastUpdatedAt. It will ignore the top level lastUpdatedAt, which is
   * added by the server automatically.
   *
   * See packages/backend/src/gameState/utils/__tests__/reconcileStates.spec.ts for examples.
   */
  stateReconcilerMethod?: StateReconcilerMethod;
}

export const BACKEND_GAME_REGISTRY: BackendGameRegistry = {
  pong: {
    gameServer: new PongGameServer()
  },
  "snatch-the-snack": {
    gameServer: new SnatchTheSnackServer(),
    stateReconcilerMethod: "closest"
  }
};
