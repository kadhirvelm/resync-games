import { ServiceDefinition } from "./genericTypes/service";
import {
  TileMapServiceApi,
  TileMapServiceDefinition
} from "./services/games/snatch-the-snack";
import { GameStateApi, GameStateServiceDefinition } from "./services/gameState";
import { HealthServiceApi, HealthServiceDefinition } from "./services/health";
import { UserServiceApi, UserServiceDefinition } from "./services/user";

export type AvailableServices = {
  gameState: GameStateApi;
  health: HealthServiceApi;
  snatchTheSnackMaps: TileMapServiceApi;
  user: UserServiceApi;
};

export type AvailbleServicesDefinition = {
  [key in keyof AvailableServices]: ServiceDefinition<AvailableServices[key]>;
};

export const AVAILABLE_SERVICES: AvailbleServicesDefinition = {
  gameState: GameStateServiceDefinition,
  health: HealthServiceDefinition,
  snatchTheSnackMaps: TileMapServiceDefinition,
  user: UserServiceDefinition
};
