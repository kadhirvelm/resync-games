import { RemoveExtendsString } from "./removeExtendsString";

/**
 * Used to declare the interface (payloads and responses) for a service definition.
 */
export interface Service {
  [key: string]: {
    payload: unknown;
    response: unknown;
  };
}

/**
 * Used to declare the interface for the expected backend implementation service.
 * All routes are POST routes, defined as `${controller}/${endpoint}`.
 */
export type ServiceDefinition<Service> = {
  /**
   * The controller name for the service.
   */
  controller: string;
  /**
   * The endpoints for the service. This is how the frontend will call on the service.
   */
  endpoints: {
    [Key in keyof RemoveExtendsString<Service>]: string;
  };
};
