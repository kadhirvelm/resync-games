import { ClientServiceCallers } from "@/services/serviceCallers";
import { PlayerId } from "@resync-games/api";
import {
  FieldListener,
  IGameStateStore
} from "@resync-games/games/dist/frontend/state";
import {
  GameStateStore,
  initializeTileStore
} from "./gameState/gameStateStore";

/**
 * Simple wrapper around a Redux store that offers a single dispatch action and a subscribe method
 * for listening to changes on a specific field path in the state.
 */
export class GameStateReduxStore implements IGameStateStore {
  private fieldListeners: { [key: string]: FieldListener[] } = {};
  private previousState: GameStateStore;

  constructor(private store: ReturnType<typeof initializeTileStore>) {
    this.previousState = this.store.getState();

    this.store.subscribe(() => {
      this.handleStateChange();
    });
  }

  public updateGameState = (newState: object) => {
    const currentState = this.store.getState();
    const { gameInfo, gameState } = currentState.gameState;

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
