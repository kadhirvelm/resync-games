import { Module } from "@nestjs/common";
import { PrismaModule } from "src/games/tiles-tbd/database/prisma.module";
import { GenericGameController } from "./genericGame.controller";
import { GenericGameService } from "./genericGame.service";
import { GenericGameSocketGateway } from "../socket/genericGameSocket.gateway";

@Module({
  controllers: [GenericGameController],
  exports: [GenericGameService],
  imports: [PrismaModule],
  providers: [GenericGameService, GenericGameSocketGateway]
})
export class TileGameModule {}
