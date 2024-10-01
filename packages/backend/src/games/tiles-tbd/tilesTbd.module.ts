import { Module } from "@nestjs/common";
import { TileMapModule } from "./map/tileMap.module";
import { TileGameModule } from "./game/tileGame.module";

@Module({
  imports: [TileMapModule, TileGameModule]
})
export class TilesTbdModule {}
