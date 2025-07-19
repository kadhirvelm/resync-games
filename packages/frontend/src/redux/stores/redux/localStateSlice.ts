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
    replaceLocalState: (state, action: PayloadAction<LocalGameStateSlice>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = action.payload;
    },
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

export const { replaceLocalState, setLocalState, updateLocalState } =
  localStateSlice.actions;
export const LocalStateReducer = localStateSlice.reducer;
