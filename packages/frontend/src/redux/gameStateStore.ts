import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { reduxLogger } from "./stores/middleware/logger";
import {
  GameStateReducer,
  GameStateReduxSlice
} from "./stores/redux/gameStateSlice";
import {
  LocalGameStateSlice,
  LocalStateReducer
} from "./stores/redux/localStateSlice";
import { PlayerReducer, PlayerSlice } from "./stores/redux/playerSlice";

export const initializeGameStateStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(reduxLogger),
    reducer: {
      gameStateSlice: GameStateReducer,
      localStateSlice: LocalStateReducer,
      playerSlice: PlayerReducer
    }
  });
};

export type StateStore = ReturnType<typeof initializeGameStateStore>;
export type GameStateStore = ReturnType<StateStore["getState"]>;
export type GameStateDispatch = StateStore["dispatch"];

export const useGameStateDispatch = useDispatch.withTypes<GameStateDispatch>();
export const useGameStateSelector = useSelector.withTypes<GameStateStore>();
export const useGameStateAppStore = useStore.withTypes<StateStore>();

export type GameStateStoreWithStates<
  GameState extends object = object,
  LocalState extends object = object
> = {
  gameStateSlice: GameStateReduxSlice<GameState>;
  localStateSlice: LocalGameStateSlice<LocalState>;
  playerSlice: PlayerSlice;
};

export const getGameHooks = <
  GameState extends object = object,
  LocalState extends object = object
>() => {
  return {
    useGameStateAppStore: useStore.withTypes<StateStore>(),
    useGameStateDispatch: useDispatch.withTypes<GameStateDispatch>(),
    useGameStateSelector:
      useSelector.withTypes<GameStateStoreWithStates<GameState, LocalState>>()
  };
};
