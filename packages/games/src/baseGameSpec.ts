import { GameState } from "./gameStateTypes";

/**
 * All backendo logic is described here.
 */
export interface IGameServer {
  // Given an input payload, create a game instance. This includes generation of maps and creating the initial game state.
  createGame(input: object): GameState;
  // Additional routes that we want to support for this specific game.
  getAvailableRoutes(): Record<string, (...args: unknown[]) => unknown>;
  // Can be used to execute additional logic every time the game state is updated and modify the new state
  // before it's sent out to the clients. The core server logic will manage everything else such as reading/writing to the DB.
  onStateUpdate(update: object, oldState: object, newState: object): void;
}

// Additional state to be maintained within the client but does not have to be sent to the server.
export interface ClientGameState {
  getState(): object;
  setState(state: object): void;
  subscribe(callback: (state: object) => void): void;
}

/**
 * A wrapper around Phaser.Game that will be used to manage the game state on the client side.
 */
export interface IGameClient {
  // Any other top-level configuration logic like resolution, physics etc.
  config: object;
  scenes: IGameScene[];
}

/**
 * A wrapper around Phaser.Scene that will be used to manage the game state on the client side.
 */
export interface IGameScene {
  onClientStateChange(newState: object): void;
  // Callbacks to be called when the game state changes to enable updating the scene in response to the game state.
  onServerStateChange(newState: object): void;
  // An object that can be used to communicate with the server with the predefined routes.
  server: unknown; //ServerInterface<IGameServer>;
  // Any other Phaser-related logic.
  // ...
}

export interface BaseResyncGame {
  serverImpl: IGameServer;
}
