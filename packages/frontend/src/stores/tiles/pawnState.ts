import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge, PawnId, Tile, TilePawn } from "@resync-games/api";
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
    initialize: (
      state,
      action: PayloadAction<{
        outboundEdges: Record<string, Edge[]>;
        pawns: TilePawn[];
        tilesIndexed: Record<string, Tile>;
      }>
    ) => {
      state.pawnState = keyBy(action.payload.pawns, "tilePawnId");
      state.outboundEdges = action.payload.outboundEdges;
      state.tilesIndexed = action.payload.tilesIndexed;
    },
    setSelectedPawn: (state, action: PayloadAction<PawnId | undefined>) => {
      state.selectedPawnId = action.payload;
    },
    updatePawns: (state, action: PayloadAction<TilePawn[]>) => {
      state.pawnState = keyBy(action.payload, "tilePawnId");
    }
  }
});

export const { initialize, setSelectedPawn, updatePawns } = pawnSlice.actions;
export const PawnStateReducer = pawnSlice.reducer;
