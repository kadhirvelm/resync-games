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
} from "@/imports/api";
import { UserService } from "./user.service";

@Controller(UserServiceDefinition.controller)
export class UserController
  implements ServiceControllerInterface<UserServiceApi>
{
  constructor(private userService: UserService) {}

  @getDecorator(UserServiceDefinition.endpoints.me)
  public async me(@Body() body: BrowserIdentifier) {
    return { player: await this.userService.getUser(body.playerId) };
  }

  @getDecorator(UserServiceDefinition.endpoints.register)
  public register(@Body() body: Player) {
    return this.userService.registerUser(body);
  }

  @getDecorator(UserServiceDefinition.endpoints.update)
  public update(@Body() body: Player) {
    return this.userService.update(body);
  }
}
