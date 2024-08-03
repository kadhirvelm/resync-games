import { Body, Controller } from "@nestjs/common";
import {
  GetAllTileMapsResponse,
  GetTileMapRequest,
  GetTileMapResponse,
  TileMapServiceApi,
  TileMapServiceDefinition
} from "@tiles-tbd/api";
import {
  getDecorator,
  ServiceControllerInterface
} from "src/genericTypes/controller";
import { TileMapService } from "./tileMap.service";

@Controller(TileMapServiceDefinition.controller)
export class TileMapController
  implements ServiceControllerInterface<TileMapServiceApi>
{
  constructor(private readonly tileMapService: TileMapService) {}

  @getDecorator(TileMapServiceDefinition.endpoints.getTileMap)
  public async getTileMap(
    @Body() request: GetTileMapRequest
  ): Promise<GetTileMapResponse> {
    return {
      tileMap: await this.tileMapService.getTileMap(request.tileMapId)
    };
  }

  @getDecorator(TileMapServiceDefinition.endpoints.getAllTileMaps)
  public async getAllTileMaps(): Promise<GetAllTileMapsResponse> {
    return {
      tileMaps: await this.tileMapService.getAllTileMaps()
    };
  }
}
