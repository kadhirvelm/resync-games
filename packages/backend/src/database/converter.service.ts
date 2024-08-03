import { Injectable } from "@nestjs/common";
import { Edge, EdgeId, Tile, TileId, TileMap, TileMapId } from "@tiles-tbd/api";
import {
  TileMap as PrismaTileMap,
  Tile as PrismaTile,
  Edge as PrismaEdge
} from "@tiles-tbd/database";

@Injectable()
export class ConverterService {
  public convertMap = (map: PrismaTileMap): TileMap => {
    return {
      startingTileId: map.startingTileId as TileId,
      tileMapId: map.tileMapId as TileMapId
    };
  };

  public convertTile = (tile: PrismaTile): Tile => {
    return {
      image: tile.image,
      tileId: tile.tileId as TileId,
      tileMapId: tile.tileMapId as TileMapId
    };
  };

  public convertEdge = (edge: PrismaEdge): Edge => {
    return {
      edgeId: edge.edgeId as EdgeId,
      flavorText: edge.flavorText,
      fromTileId: edge.fromTileId as TileId,
      toTileId: edge.toTileId as TileId
    };
  };
}
