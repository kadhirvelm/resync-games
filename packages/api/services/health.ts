import { Service, ServiceDefinition } from "../genericTypes/service";

export interface HealthServiceApi extends Service {
  ready: {
    payload: Record<string, never>;
    response: { status: string };
  };
}

export const HealthServiceDefinition: ServiceDefinition<HealthServiceApi> = {
  controller: "health",
  endpoints: {
    ready: "ready"
  }
};
