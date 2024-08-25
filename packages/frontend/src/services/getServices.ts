import { convertErrorToString } from "@/lib/convertErrorToString";
import {
  AVAILABLE_SERVICES,
  AvailableServices,
  ServiceDefinition,
  ServiceError
} from "@tiles-tbd/api";
import { AvailableServiceCaller, ServiceCaller } from "./types";

function makeFetchRequest<ReturnValue>(
  resolvedSlug: string
): (payload: unknown) => Promise<ReturnValue | ServiceError> {
  return async (payload: unknown) => {
    try {
      const response = await fetch(resolvedSlug, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      return response.json();
    } catch (error) {
      return {
        code: 500,
        message: `Error captured in the browser: ${convertErrorToString(error)}`,
        path: resolvedSlug,
        type: "error"
      };
    }
  };
}

function constructSingleServiceCaller<Key extends keyof AvailableServices>(
  hostUrl: string,
  serviceDefinition: ServiceDefinition<AvailableServices[Key]>
): ServiceCaller<AvailableServices[Key]> {
  const serviceCaller = {} as ServiceCaller<AvailableServices[Key]>;

  for (const [endpoint, slug] of Object.entries(serviceDefinition.endpoints)) {
    const typedEndpoint = endpoint as keyof ServiceCaller<
      AvailableServices[Key]
    >;
    const resolvedSlug = `${hostUrl}/${serviceDefinition.controller}/${slug}`;

    serviceCaller[typedEndpoint] = makeFetchRequest(resolvedSlug);
  }

  return serviceCaller;
}

export function getAvailableServiceCallers(
  hostUrl: string
): AvailableServiceCaller {
  const services: {
    [key: string]: ServiceCaller<AvailableServices[keyof AvailableServices]>;
  } = {};

  for (const [key, serviceDefinition] of Object.entries(AVAILABLE_SERVICES)) {
    const typedKey = key as keyof AvailableServices;
    services[typedKey] = constructSingleServiceCaller<typeof typedKey>(
      hostUrl,
      serviceDefinition
    );
  }

  return services as AvailableServiceCaller;
}
