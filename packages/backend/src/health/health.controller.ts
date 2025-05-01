import { HealthServiceApi, HealthServiceDefinition } from "@/imports/api";
import {
  getDecorator,
  ServiceControllerInterface
} from "../genericTypes/controller";
import { Controller } from "@nestjs/common";

const VERSION = "1.0.0.";

@Controller(HealthServiceDefinition.controller)
export class HealthController
  implements ServiceControllerInterface<HealthServiceApi>
{
  @getDecorator(HealthServiceDefinition.endpoints.ready)
  public ready() {
    return { status: `ok - ${VERSION}` };
  }
}
