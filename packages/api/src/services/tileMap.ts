import { Service, ServiceDefinition } from "../genericTypes/service";
import { CompleteTileMap, TileMap, TileMapId } from "./tileMap/types";

export interface GetTileMapRequest {
  tileMapId: TileMapId;
}

export interface GetTileMapResponse {
  tileMap: CompleteTileMap;
}

export interface GetAllTileMapsResponse {
  tileMaps: TileMap[];
}

export interface GenerateTileMapRequest {
  generatorName: string;
}

export interface GenerateTileMapResponse {
  tileMapId: TileMapId;
}

export interface TileMapServiceApi extends Service {
  generateTileMap: {
    payload: GenerateTileMapRequest;
    response: GenerateTileMapResponse;
  };
  getAllTileMaps: {
    payload: Record<string, never>;
    response: GetAllTileMapsResponse;
  };
  getAvailableTileMapGenerators: {
    payload: Record<string, never>;
    response: string[];
  };
  getTileMap: {
    payload: GetTileMapRequest;
    response: GetTileMapResponse;
  };
}

export const TileMapServiceDefinition: ServiceDefinition<TileMapServiceApi> = {
  controller: "tile-map",
  endpoints: {
    generateTileMap: "generate-tile-map",
    getAllTileMaps: "get-all-tile-maps",
    getAvailableTileMapGenerators: "get-available-tile-map-generators",
    getTileMap: "get-tile-map"
  }
};
