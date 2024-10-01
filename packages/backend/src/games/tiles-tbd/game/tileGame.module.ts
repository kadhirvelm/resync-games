import { Module } from "@nestjs/common";
import { PrismaModule } from "src/games/tiles-tbd/database/prisma.module";
import { TileMapService } from "src/games/tiles-tbd/map/tileMap.service";
import { TileGameController } from "./tileGame.controller";
import { TileGameService } from "./tileGame.service";
import { TileSocketGateway } from "../socket/tileSocket.gateway";

@Module({
  controllers: [TileGameController],
  exports: [TileGameService],
  imports: [PrismaModule],
  providers: [TileGameService, TileMapService, TileSocketGateway]
})
export class TileGameModule {}
