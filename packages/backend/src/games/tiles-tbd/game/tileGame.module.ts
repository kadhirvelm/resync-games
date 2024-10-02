import { Module } from "@nestjs/common";
import { TileGameController } from "./tileGame.controller";
import { TileGameService } from "./tileGame.service";
import { TileSocketGateway } from "../socket/tileSocket.gateway";
import { PrismaModule } from "../database/prisma.module";
import { TileMapService } from "../map/tileMap.service";

@Module({
  controllers: [TileGameController],
  exports: [TileGameService],
  imports: [PrismaModule],
  providers: [TileGameService, TileMapService, TileSocketGateway]
})
export class TileGameModule {}
