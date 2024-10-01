import { ServiceDefinition } from "./genericTypes/service";
import { HealthServiceApi, HealthServiceDefinition } from "./services/health";
import {
  TileGameServiceApi,
  TileGameServiceDefinition
} from "./services/games/tiles-tbd/tileGame/tileGame";
import {
  TileMapServiceApi,
  TileMapServiceDefinition
} from "./services/games/tiles-tbd/tileMap/tileMap";

export type AvailableServices = {
  health: HealthServiceApi;
  tileGame: TileGameServiceApi;
  tileMap: TileMapServiceApi;
};

export type AvailbleServicesDefinition = {
  [key in keyof AvailableServices]: ServiceDefinition<AvailableServices[key]>;
};

export const AVAILABLE_SERVICES: AvailbleServicesDefinition = {
  health: HealthServiceDefinition,
  tileGame: TileGameServiceDefinition,
  tileMap: TileMapServiceDefinition
};
