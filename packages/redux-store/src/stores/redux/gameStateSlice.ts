import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStateAndInfo, GameInfo } from "@resync-games/api";
import { omit } from "lodash-es";
import { deepMerge } from "../../utils/deepMerge";

export interface GameStateReduxSlice<GameState extends object = object> {
  gameInfo: GameInfo | undefined;
  gameState: GameState | undefined;
  localState: object;
}

const initialState: GameStateReduxSlice = {
  gameInfo: undefined,
  gameState: undefined,
  localState: {}
};

const gameStateSlice = createSlice({
  initialState,
  name: "gameStateSlice",
  reducers: {
    setGame: (state, action: PayloadAction<GameStateAndInfo>) => {
      state.gameInfo = omit(action.payload, "gameState");
      state.gameState = action.payload.gameState;
    },
    updateGameState: (state, action: PayloadAction<object>) => {
      state.gameState = deepMerge(state.gameState ?? {}, action.payload);
    },
    updateLocalState: (state, action: PayloadAction<object>) => {
      state.localState = deepMerge(state.localState, action.payload);
    }
  }
});

export const { setGame, updateLocalState } = gameStateSlice.actions;
export const GameStateReducer = gameStateSlice.reducer;
