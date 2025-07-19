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
    replaceState: (state, action: PayloadAction<GameStateReduxSlice>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = action.payload;
    },
    setGame: (state, action: PayloadAction<GameStateAndInfo>) => {
      state.gameInfo = omit(action.payload, "gameState");
      state.gameState = action.payload.gameState;
    },
    setGameState: (state, action: PayloadAction<object>) => {
      state.gameState = action.payload;
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

export const { replaceState, setGame, setGameState, updateGameState } =
  gameStateSlice.actions;
export const GameStateReducer = gameStateSlice.reducer;
