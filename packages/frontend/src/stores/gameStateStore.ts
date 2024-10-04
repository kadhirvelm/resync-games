import { ClientServiceCallers } from "@/services/serviceCallers";
import { GameInfo, GameStateAndInfo, PlayerId } from "@resync-games/api";
import {
  FieldListener,
  IGameStateStore,
  RecursivePartial
} from "@resync-games/games/dist/frontend/state";
import {
  configureStore,
  createSlice,
  EnhancedStore,
  PayloadAction
} from "@reduxjs/toolkit";

type SeparatedGameStateAndInfo<GameState extends object> = {
  gameInfo: GameInfo;
  gameState: GameState;
};

/**
 * Simple wrapper around a Redux store that offers a single dispatch action and a subscribe method
 * for listening to changes on a specific field path in the state.
 */
export class GameStateReduxStore<GameState extends object>
  implements IGameStateStore<GameState>
{
  private fieldListeners: { [key: string]: FieldListener[] } = {};
  private previousState: SeparatedGameStateAndInfo<GameState>;
  private store: EnhancedStore<
    SeparatedGameStateAndInfo<GameState>,
    PayloadAction<RecursivePartial<SeparatedGameStateAndInfo<GameState>>>
  >;

  constructor(initialState: SeparatedGameStateAndInfo<GameState>) {
    this.store = createGameStateReduxStore(initialState);
    this.previousState = initialState;

    this.store.subscribe(() => {
      this.handleStateChange();
    });
  }

  static fromGameStateAndInfo<GameState extends object>(
    initialState: GameStateAndInfo
  ): GameStateReduxStore<GameState> {
    // gameInfo is everything but the gameState field
    const gameInfo: GameInfo & { gameState?: object } = { ...initialState };
    delete gameInfo.gameState;
    const gameState = initialState.gameState as GameState;

    return new GameStateReduxStore<GameState>({
      gameInfo,
      gameState
    });
  }

  getReduxStore() {
    return this.store;
  }

  public updateGameState = (newState: RecursivePartial<GameState>) => {
    const currentState = this.store.getState();
    const { gameInfo, gameState } = currentState;

    if (gameInfo === undefined || gameState === undefined) {
      throw new Error(
        "Attempted to update the game state without the redux state being initialized. Something went terribly wrong. Please refresh the page and try again."
      );
    }

    ClientServiceCallers.gameState.updateGame({
      ...gameInfo,
      newGameState: {
        ...gameState,
        ...newState
      },
      playerId: "player-1" as PlayerId
    });
  };

  // Subscribe to a nested field
  public subscribeToField = (path: string, callback: FieldListener) => {
    if (!this.fieldListeners[path]) {
      this.fieldListeners[path] = [];
    }

    this.fieldListeners[path].push(callback);
  };

  // Handle state changes
  private handleStateChange = () => {
    const currentState = this.store.getState();

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

/**
 * Helper method to make a Redux store with a single reducer that handles partial updates to the state.
 * @param initialState Create a new Redux store with the given initial state.
 */
function createGameStateReduxStore<GameState extends object>(
  initialState: SeparatedGameStateAndInfo<GameState>
): EnhancedStore<
  SeparatedGameStateAndInfo<GameState>,
  PayloadAction<RecursivePartial<SeparatedGameStateAndInfo<GameState>>>
> {
  const gameStateSlice = createSlice({
    initialState,
    name: "gameStateAndInfo",
    reducers: {
      updateGameState(
        state,
        action: PayloadAction<
          RecursivePartial<SeparatedGameStateAndInfo<GameState>>
        >
      ): void {
        deepMerge(state, action.payload);
      }
    }
  });

  return configureStore<
    SeparatedGameStateAndInfo<GameState>,
    PayloadAction<RecursivePartial<SeparatedGameStateAndInfo<GameState>>>
  >({
    reducer: gameStateSlice.reducer
  });
}

/**
 * Helper method to merge two objects together recursively.
 * @param target The target object to merge into.
 * @param source The source object to merge from.
 * @returns The target object with the source object merged into it.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target: any, source: any): object {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      target[key] = deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Utility function to get a field by a string path
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFieldByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== "object" || typeof b !== "object") return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}
