import { HealthService, HealthServiceDefinition } from "@tiles-tbd/api";
import {
  getDecorator,
  ServiceControllerInterface
} from "../genericTypes/controller";
import { Controller } from "@nestjs/common";

@Controller(HealthServiceDefinition.controller)
export class HealthController
  implements ServiceControllerInterface<HealthService>
{
  @getDecorator(HealthServiceDefinition.endpoints.ready)
  public ready() {
    return { status: "ok" as const };
  }
}
