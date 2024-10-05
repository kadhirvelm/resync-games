import { emitGameStateUpdate } from "@/redux/utils/emitGameStateUpdate";
import { EnhancedStore } from "@reduxjs/toolkit";
import { GameInfo } from "@resync-games/api";
import { GameStateReduxSlice } from "../redux/gameStateSlice";
import { deepEqual } from "./utils/deepEqual";

type SeparatedGameStateAndInfo<GameState extends object> = {
  gameInfo: GameInfo | undefined;
  gameState: GameState | undefined;
};

export interface IGameStateHandler<
  GameState extends object = object,
  LocalGameState extends object = object
> {
  getGameInfo(): GameInfo;
  getGameState(): GameState;
  getLocalGameState(): LocalGameState;
  subscribeToGameStateUpdates(callback: (newValue: GameState) => void): void;
  updateGameState(newState: GameState): void;
}

export type GameStateReduxStore<
  GameState extends object = object,
  LocalGameState extends object = object
> = EnhancedStore<{
  gameStateSlice: GameStateReduxSlice<GameState, LocalGameState>;
}>;

/**
 * Simple wrapper around a Redux store that offers a single dispatch action and a subscribe method
 * for listening to changes on a specific field path in the state.
 */
export class GameStateHandler<
  GameState extends object,
  LocalGameState extends object
> implements IGameStateHandler<GameState>
{
  private gameStateUpdateListeners: ((newValue: GameState) => void)[] = [];
  private previousState: SeparatedGameStateAndInfo<GameState>;

  constructor(private store: GameStateReduxStore<GameState, LocalGameState>) {
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

  public getLocalGameState = () => {
    const maybeLocalGameState = this.store.getState().gameStateSlice.localState;
    if (maybeLocalGameState === undefined) {
      throw new Error(`Local game state is not initialized.`);
    }

    return maybeLocalGameState;
  };

  public updateGameState = (newState: Partial<GameState>) => {
    const currentState = this.store.getState().gameStateSlice;
    emitGameStateUpdate(currentState, newState);
  };

  public subscribeToGameStateUpdates(
    callback: (newValue: GameState) => void
  ): void {
    this.gameStateUpdateListeners.push(callback);
  }

  // Handle state changes
  private handleStateChange = () => {
    const currentState = this.store.getState().gameStateSlice;
    const currentGameState = currentState.gameState;

    if (
      currentGameState &&
      !deepEqual(this.previousState.gameState, currentGameState)
    ) {
      for (const listener of this.gameStateUpdateListeners) {
        listener(currentGameState);
      }
    }

    // Update previous state after handling changes
    this.previousState = currentState;
  };
}
