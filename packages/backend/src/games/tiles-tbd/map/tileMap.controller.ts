import { Body, Controller } from "@nestjs/common";
import {
  GenerateTileMapRequest,
  GenerateTileMapResponse,
  TileMapServiceApi,
  TileMapServiceDefinition
} from "@resync-games/api";
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

  @getDecorator(TileMapServiceDefinition.endpoints.generateTileMap)
  public async generateTileMap(
    @Body() request: GenerateTileMapRequest
  ): Promise<GenerateTileMapResponse> {
    return {
      tileMapId: await this.tileMapService.generateTileMap(
        request.generatorName
      )
    };
  }
}
