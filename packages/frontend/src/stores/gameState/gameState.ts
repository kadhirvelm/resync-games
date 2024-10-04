import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStateAndInfo, GameInfo } from "@resync-games/api";
import { omit } from "lodash-es";

export interface SnatchTheSnack {
  gameInfo: GameInfo | undefined;
  gameState: GameStateAndInfo["gameState"] | undefined;
}

const initialState: SnatchTheSnack = {
  gameInfo: undefined,
  gameState: undefined
};

const snatchTheSnackState = createSlice({
  initialState,
  name: "snatchTheSnackState",
  reducers: {
    setGame: (state, action: PayloadAction<GameStateAndInfo>) => {
      state.gameInfo = omit(action.payload, "gameState");
      state.gameState = action.payload.gameState;
    }
  }
});

export const { setGame } = snatchTheSnackState.actions;
export const SnatchTheSnackStateReducer = snatchTheSnackState.reducer;
