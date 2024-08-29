export type TileMapId = string & { __brand: "tile-map-id" };

export type TileId = string & { __brand: "tile-id" };

export type EdgeId = string & { __brand: "edge-id" };

export type TileGroupId = string & { __brand: "tile-group-id" };

export interface Edge {
  edgeId: EdgeId;
  flavorText: string;
  fromTileId: TileId;
  toTileId: TileId;
}

export interface Tile {
  image: string;
  posX: number;
  posY: number;
  tileId: TileId;
  tileMapId: TileMapId;
  tileGroupId: TileGroupId;
}

export interface TileMap {
  startingTileId: TileId;
  tileMapId: TileMapId;
}

export interface CompleteTileMap {
  edges: Edge[];
  tileMap: TileMap;
  tiles: Tile[];
}
