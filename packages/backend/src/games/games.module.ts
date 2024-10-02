import { Module } from "@nestjs/common";
import { TilesTbdModule } from "./resync-games/tilesTbd.module";

@Module({
  imports: [TilesTbdModule]
})
export class GamesModule {}
