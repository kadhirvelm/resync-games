import { Module } from "@nestjs/common";
import { TileMapController } from "./tileMap.controller";
import { TileMapService } from "./tileMap.service";
import { PrismaModule } from "../database/prisma.module";

@Module({
  controllers: [TileMapController],
  exports: [TileMapService],
  imports: [PrismaModule],
  providers: [TileMapService]
})
export class TileMapModule {}
