import { EnhancedStore } from "@reduxjs/toolkit";
import { GameInfo } from "@resync-games/api";
import { GameStateReduxSlice } from "../redux/gameStateSlice";
import { deepEqual } from "./utils/deepEqual";
import { getFieldByPath } from "./utils/getFieldByPath";

type SeparatedGameStateAndInfo<GameState extends object> = {
  gameInfo: GameInfo | undefined;
  gameState: GameState | undefined;
};

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

export type FieldListener = (newVaue: unknown) => void;

export interface IGameStateHandler<GameState extends object = object> {
  getGameInfo(): GameInfo;
  getGameState(): GameState;
  subscribeToAll(callback: FieldListener): void;
  subscribeToField(path: string, callback: FieldListener): void;
  updateGameState(newState: RecursivePartial<GameState>): void;
}

export type GameStateReduxStore<GameState extends object = object> =
  EnhancedStore<{
    gameStateSlice: GameStateReduxSlice<GameState>;
  }>;

/**
 * Simple wrapper around a Redux store that offers a single dispatch action and a subscribe method
 * for listening to changes on a specific field path in the state.
 */
export class GameStateHandler<GameState extends object>
  implements IGameStateHandler<GameState>
{
  private fieldListeners: { [key: string]: FieldListener[] } = {};
  private previousState: SeparatedGameStateAndInfo<GameState>;

  constructor(private store: GameStateReduxStore<GameState>) {
    this.previousState = this.store.getState().gameStateSlice;

    this.store.subscribe(() => {
      this.handleStateChange();
    });
  }

  public getReduxStore = () => {
    return this.store;
  };

  public getGameState = () => {
    const maybeGameState = this.store.getState().gameStateSlice.gameState;
    if (maybeGameState === undefined) {
      throw new Error(`Game state is not initialized.`);
    }

    return maybeGameState;
  };

  public getGameInfo = () => {
    const maybeGameInfo = this.store.getState().gameStateSlice.gameInfo;
    if (maybeGameInfo === undefined) {
      throw new Error(`Game state is not initialized.`);
    }

    return maybeGameInfo;
  };

  // TODO: move some dependencies around so they're more available
  public updateGameState = (_newState: RecursivePartial<GameState>) => {
    const currentState = this.store.getState().gameStateSlice;
    const { gameInfo, gameState } = currentState;

    if (gameInfo === undefined || gameState === undefined) {
      throw new Error(
        "Attempted to update the game state without the redux state being initialized. Something went terribly wrong. Please refresh the page and try again."
      );
    }

    // TODO: move this into the constructor setup so we can pass the callers in
    // ClientServiceCallers.gameState.updateGame({
    //   ...gameInfo,
    //   newGameState: {
    //     ...gameState,
    //     ...newState
    //   },
    //   playerId: "player-1" as PlayerId
    // });
  };

  // Subscribe to a nested field
  public subscribeToField = (path: string, callback: FieldListener) => {
    if (!this.fieldListeners[path]) {
      this.fieldListeners[path] = [];
    }

    this.fieldListeners[path].push(callback);
  };

  public subscribeToAll = (callback: FieldListener) => {
    this.store.subscribe(() => {
      const newState = this.store.getState().gameStateSlice;
      callback(newState);
    });
  };

  // Handle state changes
  private handleStateChange = () => {
    const currentState = this.store.getState().gameStateSlice;

    Object.keys(this.fieldListeners).forEach((path) => {
      const previousValue = getFieldByPath(this.previousState, path);
      const newValue = getFieldByPath(currentState, path);

      // Only notify listeners if the field value has changed
      if (!deepEqual(previousValue, newValue)) {
        const listeners = this.fieldListeners[path];
        if (listeners) {
          listeners.forEach((listener) => listener(newValue));
        }
      }
    });

    // Update previous state after handling changes
    this.previousState = currentState;
  };
}
