/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CreateGame,
  CurrentGameState,
  GameStateAndInfo,
  PlayerInGame
} from "@/imports/api";

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

export interface TickGameState<GameState> {
  gameState: GameState | undefined;
  hasFinished: boolean;
}

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
   * Called on when a user requests to create a game, used to initialize the game state. The default
   * configuration will come from the configuration object declared in the frontend configuration object.
   */
  createGame: (createGameRequest: CreateGame<GameConfiguration>) => Promise<{
    gameState: GameState;
    version: string;
  }>;
  /**
   * Callback on when a game configuration changes. Useful if you want to respond to when the game configuration changes.
   */
  onChangeConfiguration?: (
    game: GameState,
    newConfiguration: GameConfiguration
  ) => Promise<GameState | undefined> | GameState | undefined;
  /**
   * Callback on when a game state changes. Useful if you want to respond to when the game state starts, or pauses.
   * Return undefined if you don't want to update the game state.
   */
  onChangeState?: (
    game: ICanChangeToState<GameState, GameConfiguration>,
    newCurrentGameState: CurrentGameState
  ) => Promise<GameState | undefined> | GameState | undefined;
  /**
   * When the game state changes, this callback is called with the next game state after reconcilliation.
   * Return undefined if you don't want to update the game state.
   */
  onGameStateChange?: (
    nextGameState: GameStateAndInfo<any, any>
  ) =>
    | Promise<TickGameState<GameState> | undefined>
    | TickGameState<GameState>
    | undefined;
  /**
   * Callback on when a player joins the game. Useful if you want to initialize the player's state.
   */
  onPlayerJoin?: (
    game: GameState,
    gameConfiguration: GameConfiguration,
    player: PlayerInGame
  ) => Promise<GameState | undefined> | GameState | undefined;
  /**
   * Callback on when a player leaves the game. Useful if you want to clean up the player's state.
   */
  onPlayerLeave?: (
    game: GameState,
    gameConfiguration: GameConfiguration,
    player: PlayerInGame
  ) => Promise<GameState | undefined> | GameState | undefined;
  /**
   * Callback every 3 seconds that allows the backend to modify the game state as required. If it returns
   * undefined, the server will leave the current game state alone. The resulting game state will be reconciled
   * with the existing game state, which will then be be broadcast to all players.
   */
  tickGameState?: (
    gameStateAndInfo: GameStateAndInfo<any, any>
  ) => Promise<TickGameState<GameState>> | TickGameState<GameState> | undefined;
}
