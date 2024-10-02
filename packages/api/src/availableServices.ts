import { ServiceDefinition } from "./genericTypes/service";
import {
  TileGameServiceApi,
  TileMapServiceApi,
  TileGameServiceDefinition,
  TileMapServiceDefinition
} from "./services/games/snatch-the-snack";
import { GameStateApi, GameStateServiceDefinition } from "./services/gameState";
import { HealthServiceApi, HealthServiceDefinition } from "./services/health";

export type AvailableServices = {
  gameState: GameStateApi;
  health: HealthServiceApi;
  snatchTheSnackMaps: TileMapServiceApi;
  tileGame: TileGameServiceApi;
};

export type AvailbleServicesDefinition = {
  [key in keyof AvailableServices]: ServiceDefinition<AvailableServices[key]>;
};

export const AVAILABLE_SERVICES: AvailbleServicesDefinition = {
  gameState: GameStateServiceDefinition,
  health: HealthServiceDefinition,
  snatchTheSnackMaps: TileMapServiceDefinition,
  tileGame: TileGameServiceDefinition
};
