import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { reduxLogger } from "./stores/middleware/logger";
import { GameStateReducer } from "./stores/redux/gameStateSlice";

export const initializeGameStateStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(reduxLogger),
    reducer: {
      gameStateSlice: GameStateReducer
    }
  });
};

export type StateStore = ReturnType<typeof initializeGameStateStore>;
export type GameStateStore = ReturnType<StateStore["getState"]>;
export type GameStateDispatch = StateStore["dispatch"];

export const useGameStateDispatch = useDispatch.withTypes<GameStateDispatch>();
export const useGameStateSelector = useSelector.withTypes<GameStateStore>();
export const useGameStateAppStore = useStore.withTypes<StateStore>();
