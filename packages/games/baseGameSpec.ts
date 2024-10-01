type BaseServerGameInstance = {
  gameId: string;
  // Static game map data that will not be updated.
  gameMap: object;
  gameName: string;
  // State of the game that will be constantly updated.
  gameState: object;
};

/**
 * All backend logic is described here.
 */
interface IGameServer {
  // Given an input payload, create a game instance. This includes generation of maps and creating the initial game state.
  createGame(input: object): BaseGameInstance;
  // Additional routes that we want to support for this specific game.
  getAvailableRoutes(): Record<string, (...args: unknown[]) => unknown>;
  // Can be used to execute additional logic every time the game state is updated and modify the new state
  // before it's sent out to the clients. The core server logic will manage everything else such as reading/writing to the DB.
  onStateUpdate(update: object, oldState: object, newState: object): void;
}

// Additional state to be maintained within the client but does not have to be sent to the server.
interface ClientGameState {
  getState(): object;
  setState(state: object): void;
  subscribe(callback: (state: object) => void): void;
}

/**
 * A wrapper around Phaser.Game that will be used to manage the game state on the client side.
 */
interface IGameClient {
  // Any other top-level configuration logic like resolution, physics etc.
  config: object;
  scenes: IGameScene[];
}

/**
 * A wrapper around Phaser.Scene that will be used to manage the game state on the client side.
 */
interface IGameScene {
  onClientStateChange(newState: object): void;
  // Callbacks to be called when the game state changes to enable updating the scene in response to the game state.
  onServerStateChange(newState: object): void;
  // An object that can be used to communicate with the server with the predefined routes.
  server: ServerInterface<IGameServer>;
  // Any other Phaser-related logic.
  // ...
}

export interface BaseResyncGame {
  serverImpl: IGameServer;
}
