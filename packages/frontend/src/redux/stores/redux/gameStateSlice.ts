import { emitGameStateUpdate } from "@/redux/utils/emitGameStateUpdate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameInfo, GameStateAndInfo, Player } from "@/imports/api";
import { omit } from "lodash-es";

export interface GameStateReduxSlice<GameState extends object = object> {
  gameInfo: GameInfo | undefined;
  gameState: GameState | undefined;
}

const initialState: GameStateReduxSlice = {
  gameInfo: undefined,
  gameState: undefined
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
      state: GameStateReduxSlice<object>,
      action: PayloadAction<{ gameState: GameState; player: Player }>
    ) => {
      emitGameStateUpdate(
        state,
        action.payload.gameState,
        action.payload.player
      );
    }
  }
});

export const { setGame, updateGameState } = gameStateSlice.actions;
export const GameStateReducer = gameStateSlice.reducer;
