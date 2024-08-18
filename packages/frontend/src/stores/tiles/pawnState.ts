import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge, PawnId, Tile, TilePawn } from "@tiles-tbd/api";
import { keyBy } from "lodash-es";

export interface PawnState {
  outboundEdges: Record<string, Edge[]>;
  pawnState: {
    [tilePawnId: PawnId]: TilePawn;
  };
  selectedPawnId: PawnId | undefined;
  tilesIndexed: Record<string, Tile>;
}

const initialState: PawnState = {
  outboundEdges: {},
  pawnState: {},
  selectedPawnId: undefined,
  tilesIndexed: {}
};

const pawnSlice = createSlice({
  initialState,
  name: "pawnState",
  reducers: {
    setInitialPawns: (state, action: PayloadAction<TilePawn[]>) => {
      state.pawnState = keyBy(action.payload, "tilePawnId");
    },
    setOutboundEdges: (
      state,
      action: PayloadAction<Record<string, Edge[]>>
    ) => {
      state.outboundEdges = action.payload;
    },
    setSelectedPawn: (state, action: PayloadAction<PawnId | undefined>) => {
      state.selectedPawnId = action.payload;
    },
    setTilesIndexed: (state, action: PayloadAction<Record<string, Tile>>) => {
      state.tilesIndexed = action.payload;
    },
    updatePawn: (state, action: PayloadAction<TilePawn>) => {
      state.pawnState[action.payload.tilePawnId] = action.payload;
    }
  }
});

export const {
  setInitialPawns,
  setOutboundEdges,
  setSelectedPawn,
  setTilesIndexed,
  updatePawn
} = pawnSlice.actions;
export const PawnStateReducer = pawnSlice.reducer;
