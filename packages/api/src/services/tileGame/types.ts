import { TileId, TileMapId } from "../tileMap/types";

export type TileGameId = string & { __brand: "tile-game-id" };

export type PawnId = string & { __brand: "pawn-id" };

export interface TilePawn {
  color: string;
  onTileId: TileId;
  pawnId: PawnId;
}

export type TileGameState = "waiting" | "playing" | "finished";

export interface TileGame {
  name: string;
  pawns: TilePawn[];
  state: TileGameState;
  tileGameId: TileGameId;
  tileMapId: TileMapId;
}
