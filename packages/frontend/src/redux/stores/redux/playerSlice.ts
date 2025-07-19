import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    replacePlayer: (state, action: PayloadAction<PlayerSlice>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = action.payload;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    }
  }
});

export const { replacePlayer, setPlayer } = playerStateSlice.actions;
export const PlayerReducer = playerStateSlice.reducer;
