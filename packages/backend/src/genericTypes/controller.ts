import { Get, Post } from "@nestjs/common";
import { RemoveExtendsString, Service } from "@/imports/api";

/**
 * Used to declare the interface for the expected backend implementation service.
 */
export type ServiceControllerInterface<S extends Service> = {
  [Key in keyof RemoveExtendsString<S>]: (
    payload?: S[Key]["payload"]
  ) => S[Key]["response"] | Promise<S[Key]["response"]>;
};

/**
 * All endpoints are POST requests for now, but this pseudo-decorator allows us to
 * change that in the future if needed.
 */
export function getDecorator(endpoint: string) {
  if (endpoint === "ready") {
    return Get(endpoint);
  }

  return Post(endpoint);
}
