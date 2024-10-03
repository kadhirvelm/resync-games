import { Module } from "@nestjs/common";
import { TileMapModule } from "./tiles-tbd/map/tileMap.module";

@Module({
  imports: [TileMapModule]
})
export class GamesModule {}
