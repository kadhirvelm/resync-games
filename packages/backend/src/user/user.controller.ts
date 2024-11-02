import {
  getDecorator,
  ServiceControllerInterface
} from "@/genericTypes/controller";
import { Body, Controller } from "@nestjs/common";
import {
  BrowserIdentifier,
  Player,
  UserServiceApi,
  UserServiceDefinition
} from "@resync-games/api";
import { UserService } from "./user.service";

@Controller(UserServiceDefinition.controller)
export class UserController
  implements ServiceControllerInterface<UserServiceApi>
{
  constructor(private userService: UserService) {}

  @getDecorator(UserServiceDefinition.endpoints.me)
  public me(@Body() body: BrowserIdentifier) {
    return this.userService.getUser(body.playerId);
  }

  @getDecorator(UserServiceDefinition.endpoints.register)
  public register(@Body() body: Player) {
    return this.userService.registerUser(body.playerId, body.displayName);
  }

  @getDecorator(UserServiceDefinition.endpoints.update)
  public update(@Body() body: Player) {
    return this.userService.update(body);
  }
}
