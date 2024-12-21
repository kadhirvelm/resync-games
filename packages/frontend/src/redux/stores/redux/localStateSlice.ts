import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocalGameStateSlice<LocalGameState extends object = object> {
  localState: LocalGameState | undefined;
}

const initialState: LocalGameStateSlice = {
  localState: undefined
};

const localStateSlice = createSlice({
  initialState,
  name: "localStateSlice",
  reducers: {
    setLocalState: (state, action: PayloadAction<object | undefined>) => {
      state.localState = action.payload;
    },
    updateLocalState: <LocalState extends object = object>(
      state: LocalGameStateSlice<object>,
      action: PayloadAction<LocalState>
    ) => {
      state.localState = { ...state.localState, ...action.payload };
    }
  }
});

export const { setLocalState, updateLocalState } = localStateSlice.actions;
export const LocalStateReducer = localStateSlice.reducer;
