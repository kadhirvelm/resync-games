import { TileId, TileMapId } from "../tileMap/types";

export type TileGameId = string & { __brand: "tile-game-id" };

export type PawnId = string & { __brand: "pawn-id" };

export interface TilePawn {
  color: string;
  onTileId: TileId;
  tilePawnId: PawnId;
}

export type TileGameState = "waiting" | "playing" | "finished";

export interface TileGame {
  name: string;
  state: TileGameState;
  tileGameId: TileGameId;
  tileMapId: TileMapId;
  visitedTileGroupIds: string[];
}

export interface TileGameWithPawns extends TileGame {
  pawns: TilePawn[];
}
