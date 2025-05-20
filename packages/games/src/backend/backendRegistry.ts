/* eslint-disable @typescript-eslint/no-explicit-any */

import { GAME_SLUGS } from "../shared/gamesRegistry";
import { IGameServer } from "./base";
import { FishbowlServer } from "./fishbowl/fishbowl";
import { PongGameServer } from "./pong/pong";
import { TheStockTimesServer } from "./theStockTimes/theStockTimes";

export type BackendGameRegistry = {
  [GameSlug in (typeof GAME_SLUGS)[number]]: BackendRegisteredGame;
};

export type AvailableGameType = (typeof GAME_SLUGS)[number];

export type StateReconcilerMethod = "top-level" | "closest";

export interface BackendRegisteredGame {
  /**
   * The game server for the game. This is where the game logic is implemented.
   */
  gameServer: IGameServer<any, any>;
  /**
   * Defaults to "top-level", which will accept changes based on the most updated top-level
   * lastUpdatedAt timestamp. This will get automatically added by the server on all state
   * changes.
   *
   * The "closest" method will accept changes based on the most updated lastUpdatedAt
   * timestamp, recursively checking through the nested object. Doing a depth first search
   * through the object's keys, it will reconcile state changes based on which object has
   * the most updated lastUpdatedAt timestamp closest to the key being checked. It will prefer
   * the previous state if both timestamps are identical.
   *
   * See packages/backend/src/gameState/utils/__tests__/reconcileStates.spec.ts for examples.
   */
  stateReconcilerMethod?: StateReconcilerMethod;
}

export const BACKEND_GAME_REGISTRY: BackendGameRegistry = {
  fishbowl: {
    gameServer: new FishbowlServer(),
    stateReconcilerMethod: "closest"
  },
  pong: {
    gameServer: new PongGameServer(),
    stateReconcilerMethod: "closest"
  },
  "the-stock-times": {
    gameServer: new TheStockTimesServer(),
    stateReconcilerMethod: "closest"
  }
};
