import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { TileMapController } from "./tileMap.controller";
import { TileMapService } from "./tileMap.service";

@Module({
  controllers: [TileMapController],
  exports: [TileMapService],
  imports: [PrismaModule],
  providers: [TileMapService]
})
export class TileMapModule {}
