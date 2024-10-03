import { Service, ServiceDefinition } from "../../../../genericTypes/service";
import { TileMapId } from "./types";

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
}

export const TileMapServiceDefinition: ServiceDefinition<TileMapServiceApi> = {
  controller: "tile-map",
  endpoints: {
    generateTileMap: "generate-tile-map"
  }
};
