import { ServiceDefinition } from "./genericTypes/service";
import {
  TileMapServiceApi,
  TileMapServiceDefinition
} from "./services/games/snatch-the-snack";
import { GameStateApi, GameStateServiceDefinition } from "./services/gameState";
import {
  GlobalScreenApi,
  GlobalScreenServiceDefinition
} from "./services/globalScreen";
import { HealthServiceApi, HealthServiceDefinition } from "./services/health";
import {
  SnapshotStateApi,
  SnapshotStateServiceDefinition
} from "./services/snapshotState";
import { UserServiceApi, UserServiceDefinition } from "./services/user";

export type AvailableServices = {
  gameState: GameStateApi;
  globalScreen: GlobalScreenApi;
  health: HealthServiceApi;
  snapshotState: SnapshotStateApi;
  snatchTheSnackMaps: TileMapServiceApi;
  user: UserServiceApi;
};

export type AvailbleServicesDefinition = {
  [key in keyof AvailableServices]: ServiceDefinition<AvailableServices[key]>;
};

export const AVAILABLE_SERVICES: AvailbleServicesDefinition = {
  gameState: GameStateServiceDefinition,
  globalScreen: GlobalScreenServiceDefinition,
  health: HealthServiceDefinition,
  snapshotState: SnapshotStateServiceDefinition,
  snatchTheSnackMaps: TileMapServiceDefinition,
  user: UserServiceDefinition
};
