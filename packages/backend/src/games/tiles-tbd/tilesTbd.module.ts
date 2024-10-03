import { Module } from "@nestjs/common";
import { TileMapModule } from "./map/tileMap.module";

@Module({
  imports: [TileMapModule]
})
export class TilesTbdModule {}
