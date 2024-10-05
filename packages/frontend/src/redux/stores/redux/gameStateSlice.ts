import { emitGameStateUpdate } from "@/redux/utils/emitGameStateUpdate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameInfo, GameStateAndInfo } from "@resync-games/api";
import { omit } from "lodash-es";

export interface GameStateReduxSlice<
  GameState extends object = object,
  LocalGameState extends object = object
> {
  gameInfo: GameInfo | undefined;
  gameState: GameState | undefined;
  localState: LocalGameState | undefined;
}

const initialState: GameStateReduxSlice = {
  gameInfo: undefined,
  gameState: undefined,
  localState: undefined
};

const gameStateSlice = createSlice({
  initialState,
  name: "gameStateSlice",
  reducers: {
    setGame: (state, action: PayloadAction<GameStateAndInfo>) => {
      state.gameInfo = omit(action.payload, "gameState");
      state.gameState = action.payload.gameState;
    },
    updateGameState: <GameState extends object = object>(
      state: GameStateReduxSlice<object, object>,
      action: PayloadAction<GameState>
    ) => {
      emitGameStateUpdate(state, action.payload);
    },
    updateLocalState: <LocalState extends object = object>(
      state: GameStateReduxSlice<object, object>,
      action: PayloadAction<LocalState>
    ) => {
      state.localState = { ...state.localState, ...action.payload };
    }
  }
});

export const { setGame, updateGameState, updateLocalState } =
  gameStateSlice.actions;
export const GameStateReducer = gameStateSlice.reducer;
