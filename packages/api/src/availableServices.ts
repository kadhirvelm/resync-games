import { ServiceDefinition } from "./genericTypes/service";
import { HealthServiceApi, HealthServiceDefinition } from "./services/health";
import {
  TileMapServiceApi,
  TileMapServiceDefinition
} from "./services/tileMap";

export type AvailableServices = {
  health: HealthServiceApi;
  tileMap: TileMapServiceApi;
};

export type AvailbleServicesDefinition = {
  [key in keyof AvailableServices]: ServiceDefinition<AvailableServices[key]>;
};

export const AVAILABLE_SERVICES: AvailbleServicesDefinition = {
  health: HealthServiceDefinition,
  tileMap: TileMapServiceDefinition
};
