import {
  CreateGame,
  CurrentGameState,
  GameStateAndInfo,
  Player,
  PlayerInGame
} from "@resync-games/api";

export interface ICanChangeToState<
  GameState = object,
  GameConfiguration = object
> {
  currentGameState: CurrentGameState;
  gameConfiguration: GameConfiguration;
  gameState: GameState;
  players: PlayerInGame[];
}

export interface ICanChange {
  canChange: true;
}

export interface ICannotChange {
  canChange: false;
  reason: string;
}

export type ICanChangeToStateResponse = ICanChange | ICannotChange;

export interface IGameServer<GameState, GameConfiguration> {
  /**
   * Determines whether the game can change to the new state. Generally used to determine if the
   * game can start or not.
   */
  canChangeToState?: (
    game: ICanChangeToState<GameState, GameConfiguration>,
    newCurrentGameState: CurrentGameState
  ) => ICanChangeToStateResponse;
  /**
   * Called on when a user requests to create a game, used to initialize the initial game state.
   */
  createGame: (createGameRequest: CreateGame<GameConfiguration>) => Promise<{
    gameState: object;
    version: string;
  }>;
  /**
   * Callback on when a player joins the game. Useful if you want to initialize the player's state.
   */
  onPlayerJoin?: (game: GameState, player: Player) => GameState;
  /**
   * Callback on when a player leaves the game. Useful if you want to clean up the player's state.
   */
  onPlayerLeave?: (game: GameState, player: Player) => GameState;
  /**
   * Callback every 5 seconds that allows the backend to modify the game state as required. If it returns
   * undefined, the server will leave the current game state alone. The resulting game state will be reconciled
   * with the existing game state, which will then be be broadcast to all players.
   */
  tickGameState?: (gameStateAndInfo: GameStateAndInfo) => GameState | undefined;
}
