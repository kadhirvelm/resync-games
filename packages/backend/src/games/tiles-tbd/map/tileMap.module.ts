import { Module } from "@nestjs/common";
import { TileMapController } from "./tileMap.controller";
import { TileMapService } from "./tileMap.service";

@Module({
  controllers: [TileMapController],
  exports: [TileMapService],
  providers: [TileMapService]
})
export class TileMapModule {}
