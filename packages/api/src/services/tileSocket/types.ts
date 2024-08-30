import { TileGame, TilePawn } from "../tileGame/types";

export interface IdentifySocket {
  socketId: string;
}

export interface NewPawnState {
  pawnState: TilePawn[];
}

export interface NewGameState {
  gameState: TileGame;
}
