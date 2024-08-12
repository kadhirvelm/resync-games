import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { reduxLogger } from "../middleware/logger";
import { PawnStateReducer } from "./pawnState";

export const initializeTileStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(reduxLogger),
    reducer: {
      pawnState: PawnStateReducer
    }
  });
};

type TileAppStore = ReturnType<typeof initializeTileStore>;
export type TileStore = ReturnType<TileAppStore["getState"]>;
export type TileDispatch = TileAppStore["dispatch"];

export const useTileDispatch = useDispatch.withTypes<TileDispatch>();
export const useTileSelector = useSelector.withTypes<TileStore>();
