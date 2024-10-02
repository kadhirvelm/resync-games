import { ServiceDefinition } from "./genericTypes/service";
import {
  TileGameServiceApi,
  TileMapServiceApi,
  TileGameServiceDefinition,
  TileMapServiceDefinition
} from "./services/games/snatch-the-snack";
import { HealthServiceApi, HealthServiceDefinition } from "./services/health";

export type AvailableServices = {
  health: HealthServiceApi;
  snatchTheSnackMaps: TileMapServiceApi;
  tileGame: TileGameServiceApi;
};

export type AvailbleServicesDefinition = {
  [key in keyof AvailableServices]: ServiceDefinition<AvailableServices[key]>;
};

export const AVAILABLE_SERVICES: AvailbleServicesDefinition = {
  health: HealthServiceDefinition,
  snatchTheSnackMaps: TileMapServiceDefinition,
  tileGame: TileGameServiceDefinition
};
