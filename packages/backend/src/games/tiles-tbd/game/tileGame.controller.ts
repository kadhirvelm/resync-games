import { Body, Controller } from "@nestjs/common";
import {
  GetAvailableTileGamesResponse,
  GetTileGameRequest,
  GetTileGameResponse,
  CreateTileGameRequest,
  CreateTileGameResponse,
  TileGameServiceApi,
  TileGameServiceDefinition,
  MovePawnRequest,
  MovePawnResponse
} from "@tiles-tbd/api";
import {
  ServiceControllerInterface,
  getDecorator
} from "src/genericTypes/controller";
import { TileGameService } from "./tileGame.service";

@Controller(TileGameServiceDefinition.controller)
export class TileGameController
  implements ServiceControllerInterface<TileGameServiceApi>
{
  constructor(private readonly tileGameService: TileGameService) {}

  @getDecorator(TileGameServiceDefinition.endpoints.getTileGame)
  public async getTileGame(
    @Body() request: GetTileGameRequest
  ): Promise<GetTileGameResponse> {
    return this.tileGameService.getTileGame(request.gameId);
  }

  @getDecorator(TileGameServiceDefinition.endpoints.getAvailableGames)
  public async getAvailableGames(): Promise<GetAvailableTileGamesResponse> {
    return this.tileGameService.getAvailableGames();
  }

  @getDecorator(TileGameServiceDefinition.endpoints.createGame)
  public async createGame(
    @Body() request: CreateTileGameRequest
  ): Promise<CreateTileGameResponse> {
    return this.tileGameService.createGame(request);
  }

  @getDecorator(TileGameServiceDefinition.endpoints.movePawn)
  public async movePawn(
    @Body() request: MovePawnRequest
  ): Promise<MovePawnResponse> {
    return this.tileGameService.movePawn(request);
  }
}
