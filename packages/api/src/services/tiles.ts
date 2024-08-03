export type TileId = string & { __brand: "tile-id" };

export type EdgeId = string & { __brand: "edge-id" };

export interface Edge {
  edgeId: EdgeId;
  metadata: {
    flavorText: string;
  };
  tileId: TileId;
}

export interface Tile {
  edges: Edge[];
  image: string;
  tileId: TileId;
}
