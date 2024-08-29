import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { TileMapService } from "src/map/tileMap.service";
import { TileGameController } from "./tileGame.controller";
import { TileGameService } from "./tileGame.service";
import { SocketGateway } from "src/socket/socket.gateway";

@Module({
  controllers: [TileGameController],
  exports: [TileGameService],
  imports: [PrismaModule],
  providers: [TileGameService, TileMapService, SocketGateway]
})
export class TileGameModule {}
