import { Body, Controller } from "@nestjs/common";
import {
  CreateTileGameResponse,
  TileGameServiceDefinition,
  GameStateApi,
  AvailableGames,
  CreateGameRequest
} from "@tiles-tbd/api";
import {
  ServiceControllerInterface,
  getDecorator
} from "src/genericTypes/controller";
import { GenericGameService } from "./genericGame.service";

@Controller(TileGameServiceDefinition.controller)
export class GenericGameController
  implements ServiceControllerInterface<GameStateApi>
{
  constructor(private readonly genericGameService: GenericGameService) {}

  @getDecorator(TileGameServiceDefinition.endpoints.getAvailableGames)
  public async getAvailableGames(): Promise<AvailableGames> {
    return this.genericGameService.getAvailableGames();
  }

  @getDecorator(TileGameServiceDefinition.endpoints.createGame)
  public async createGame(
    @Body() request: CreateGameRequest
  ): Promise<CreateTileGameResponse> {
    return this.genericGameService.createGame(request);
  }
}
