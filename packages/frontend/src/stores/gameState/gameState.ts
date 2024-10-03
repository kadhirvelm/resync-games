import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "@resync-games/api";
import { omit } from "lodash-es";

export interface SnatchTheSnack {
  gameInfo: Omit<GameState, "gameState"> | undefined;
  gameState: GameState["gameState"] | undefined;
}

const initialState: SnatchTheSnack = {
  gameInfo: undefined,
  gameState: undefined
};

const snatchTheSnackState = createSlice({
  initialState,
  name: "snatchTheSnackState",
  reducers: {
    setGame: (state, action: PayloadAction<GameState>) => {
      state.gameInfo = omit(action.payload, "gameState");
      state.gameState = action.payload.gameState;
    }
  }
});

export const { setGame } = snatchTheSnackState.actions;
export const SnatchTheSnackStateReducer = snatchTheSnackState.reducer;
