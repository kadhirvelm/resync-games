import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { TileMapController } from "./tileMap.controller";
import { TileMapService } from "./tileMap.service";
import { ConverterService } from "src/database/converter.service";

@Module({
  controllers: [TileMapController],
  exports: [TileMapService],
  providers: [TileMapService, PrismaService, ConverterService]
})
export class TileMapModule {}
