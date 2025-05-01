import { createSlice } from "@reduxjs/toolkit";
import { Player } from "@/imports/api";

export interface PlayerSlice {
  player: Player | undefined;
}

const initialState: PlayerSlice = {
  player: undefined
};

const playerStateSlice = createSlice({
  initialState,
  name: "playerSlice",
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    }
  }
});

export const { setPlayer } = playerStateSlice.actions;
export const PlayerReducer = playerStateSlice.reducer;
