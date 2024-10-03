import {
  configureStore,
  createSlice,
  EnhancedStore,
  PayloadAction
} from "@reduxjs/toolkit";

/**
 * Simple wrapper around a Redux store that offers a single dispatch action and a subscribe method
 * for listening to changes on a specific field path in the state.
 */
export class GameStateReduxStore<GameState extends object> {
  private store: EnhancedStore<GameState, PayloadAction<Partial<GameState>>>;
  constructor(initialState: GameState) {
    this.store = createGameStateReduxStore(initialState);
  }
}

/**
 * Helper method to make a Redux store with a single reducer that handles partial updates to the state.
 * @param initialState Create a new Redux store with the given initial state.
 */
function createGameStateReduxStore<GameState extends object>(
  initialState: GameState
): EnhancedStore<GameState, PayloadAction<Partial<GameState>>> {
  const gameStateSlice = createSlice({
    initialState,
    name: "gameState",
    reducers: {
      updateGameState(state, action: PayloadAction<Partial<GameState>>): void {
        deepMerge(state, action.payload);
      }
    }
  });

  return configureStore<GameState, PayloadAction<Partial<GameState>>>({
    reducer: gameStateSlice.reducer
  });
}

/**
 * Helper method to merge two objects together recursively.
 * @param target The target object to merge into.
 * @param source The source object to merge from.
 * @returns The target object with the source object merged into it.
 */
function deepMerge(target: object, source: object): object {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      target[key] = deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
