import { Body, Controller } from "@nestjs/common";
import {
  GetAvailableTileGamesResponse,
  GetTileGameRequest,
  GetTileGameResponse,
  InitializeTileGameRequest,
  InitializeTileGameResponse,
  TileGameServiceApi,
  TileGameServiceDefinition
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

  @getDecorator(TileGameServiceDefinition.endpoints.initializeGame)
  public async initializeGame(
    @Body() request: InitializeTileGameRequest
  ): Promise<InitializeTileGameResponse> {
    return this.tileGameService.initializeGame(request);
  }
}