import { TileGameId, TilePawn } from "../tileGame/types";

export interface IdentifySocket {
  socketId: string;
  tileGameId: TileGameId;
}

export interface NewPawnState {
  pawnState: TilePawn[];
}
