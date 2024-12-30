import {
  getDecorator,
  ServiceControllerInterface
} from "@/genericTypes/controller";
import { Body, Controller } from "@nestjs/common";
import {
  GlobalScreenServiceDefinition,
  GlobalScreenApi,
  GlobalGetGameState
} from "@resync-games/api";
import { GlobalScreenService } from "./utils/globalScreen.service";

@Controller(GlobalScreenServiceDefinition.controller)
export class GlobalScreenController
  implements ServiceControllerInterface<GlobalScreenApi>
{
  constructor(private readonly globalScreenService: GlobalScreenService) {}

  @getDecorator(GlobalScreenServiceDefinition.endpoints.getGameState)
  public async getGameState(@Body() request: GlobalGetGameState) {
    return this.globalScreenService.getGameState(request);
  }
}
