import { Service, ServiceDefinition } from "../genericTypes/service";
import { CompleteTileMap, TileMap, TileMapId } from "./map/types";

export interface GetTileMapRequest {
  tileMapId: TileMapId;
}

export interface GetTileMapResponse {
  tileMap: CompleteTileMap;
}

export interface GetAllTileMapsResponse {
  tileMaps: TileMap[];
}

export interface TileMapServiceApi extends Service {
  getAllTileMaps: {
    payload: Record<string, never>;
    response: GetAllTileMapsResponse;
  };
  getTileMap: {
    payload: GetTileMapRequest;
    response: GetTileMapResponse;
  };
}

export const TileMapServiceDefinition: ServiceDefinition<TileMapServiceApi> = {
  controller: "tile-map",
  endpoints: {
    getAllTileMaps: "get-all-tile-maps",
    getTileMap: "get-tile-map"
  }
};
