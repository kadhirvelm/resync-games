import { Service, ServiceDefinition } from "./genericTypes/service";

export interface HealthService extends Service {
  ready: {
    payload: Record<string, never>;
    response: { status: "ok" };
  };
}

export const HealthServiceDefinition: ServiceDefinition<HealthService> = {
  controller: "health",
  endpoints: {
    ready: {
      endpoint: "ready"
    }
  }
};
