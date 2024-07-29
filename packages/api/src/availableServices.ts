import { ServiceDefinition } from "./genericTypes/service";
import { HealthService, HealthServiceDefinition } from "./services/health";

export type AvailableServices = {
  health: HealthService;
};

export type AvailbleServicesDefinition = {
  [key in keyof AvailableServices]: ServiceDefinition<AvailableServices[key]>;
};

export const AVAILABLE_SERVICES: AvailbleServicesDefinition = {
  health: HealthServiceDefinition
};
