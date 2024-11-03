import {
  CreateGame,
  CurrentGameState,
  GameStateAndInfo,
  Player,
  PlayerInGame
} from "@resync-games/api";

export interface ICanChangeToState<T> {
  currentGameState: CurrentGameState;
  gameState: T;
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

export interface IGameServer<GameState> {
  /**
   * Determines whether the game can change to the new state. Generally used to determine if the
   * game can start or not.
   */
  canChangeToState?: (
    game: ICanChangeToState<GameState>,
    newCurrentGameState: CurrentGameState
  ) => ICanChangeToStateResponse;
  /**
   * Called on when a user requests to create a game, used to initialize the initial game state.
   */
  createGame: (createGameRequest: CreateGame) => Promise<{
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
   * undefined, the server will leave the current game state alone. All game state updates will be broadcast
   * to all players.
   */
  tickGameState?: (gameStateAndInfo: GameStateAndInfo) => GameState | undefined;
}
