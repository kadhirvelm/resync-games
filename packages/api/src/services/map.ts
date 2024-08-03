import { Service, ServiceDefinition } from "../genericTypes/service";
import { Tile, TileId } from "./tiles";

export interface GetMap {
  mapId: string;
}

export interface Map {
  startingTileId: TileId;
  tiles: Tile[];
}

export interface MapService extends Service {
  getMap: {
    payload: GetMap;
    response: Map;
  };
}

export const MapServiceDefinition: ServiceDefinition<MapService> = {
  controller: "map",
  endpoints: {
    getMap: "get-map"
  }
};
