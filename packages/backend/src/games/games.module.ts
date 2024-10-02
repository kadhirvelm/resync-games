import { Module } from "@nestjs/common";
import { TilesTbdModule } from "./tiles-tbd/tilesTbd.module";

@Module({
  imports: [TilesTbdModule]
})
export class GamesModule {}
