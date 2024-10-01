import { createSlice } from "@reduxjs/toolkit";
import { CompleteTileMap } from "@tiles-tbd/api";

const initialState: {
  map: CompleteTileMap | undefined;
} = {
  map: undefined
};

const tileMapState = createSlice({
  initialState,
  name: "tileMapState",
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    }
  }
});

export const { setMap } = tileMapState.actions;
export const TileMapStateReducer = tileMapState.reducer;
