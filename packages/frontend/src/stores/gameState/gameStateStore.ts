import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { reduxLogger } from "../middleware/logger";
import { SnatchTheSnackStateReducer } from "./gameState";

export const initializeTileStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(reduxLogger),
    reducer: {
      gameState: SnatchTheSnackStateReducer
    }
  });
};

export type StateStore = ReturnType<typeof initializeTileStore>;
export type GameStateStore = ReturnType<StateStore["getState"]>;
export type GameStateDispatch = StateStore["dispatch"];

export const useGameStateDispatch = useDispatch.withTypes<GameStateDispatch>();
export const useGameStateSelector = useSelector.withTypes<GameStateStore>();
export const useGameStateAppStore = useStore.withTypes<StateStore>();
