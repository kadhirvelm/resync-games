import { createSlice } from "@reduxjs/toolkit";
import { TileGame } from "@resync-games/api";

export interface TileGameState {
  game: TileGame | undefined;
}

const initialState: TileGameState = {
  game: undefined
};

const tileGameState = createSlice({
  initialState,
  name: "tileGameState",
  reducers: {
    setGame: (state, action) => {
      state.game = action.payload;
    }
  }
});

export const { setGame } = tileGameState.actions;
export const TileGameStateReducer = tileGameState.reducer;
