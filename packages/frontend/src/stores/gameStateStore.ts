import {
  configureStore,
  createSlice,
  EnhancedStore,
  PayloadAction
} from "@reduxjs/toolkit";

type FieldListener = (newValue: unknown) => void;

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

/**
 * Simple wrapper around a Redux store that offers a single dispatch action and a subscribe method
 * for listening to changes on a specific field path in the state.
 */
export class GameStateReduxStore<GameState extends object> {
  private fieldListeners: { [key: string]: FieldListener[] } = {};
  private store: EnhancedStore<
    GameState,
    PayloadAction<RecursivePartial<GameState>>
  >;
  private previousState: GameState;
  constructor(initialState: GameState) {
    this.store = createGameStateReduxStore(initialState);
    this.previousState = initialState;

    this.store.subscribe(() => {
      this.handleStateChange();
    });
  }

  getReduxStore(): EnhancedStore<
    GameState,
    PayloadAction<RecursivePartial<GameState>>
  > {
    return this.store;
  }

  dispatch(stateUpdate: RecursivePartial<GameState>): void {
    this.store.dispatch({
      payload: stateUpdate,
      type: "gameState/updateGameState"
    });
  }

  // Subscribe to a nested field
  subscribeToField(path: string, listener: FieldListener) {
    if (!this.fieldListeners[path]) {
      this.fieldListeners[path] = [];
    }
    this.fieldListeners[path].push(listener);
  }

  // Handle state changes
  handleStateChange() {
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
  }
}

/**
 * Helper method to make a Redux store with a single reducer that handles partial updates to the state.
 * @param initialState Create a new Redux store with the given initial state.
 */
function createGameStateReduxStore<GameState extends object>(
  initialState: GameState
): EnhancedStore<GameState, PayloadAction<RecursivePartial<GameState>>> {
  const gameStateSlice = createSlice({
    initialState,
    name: "gameState",
    reducers: {
      updateGameState(
        state,
        action: PayloadAction<RecursivePartial<GameState>>
      ): void {
        deepMerge(state, action.payload);
      }
    }
  });

  return configureStore<GameState, PayloadAction<RecursivePartial<GameState>>>({
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
