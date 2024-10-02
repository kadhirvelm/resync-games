import { Module } from "@nestjs/common";
import { GameStateController } from "./gameState.controller";
import { GameStateService } from "./gameState.service";
import { GameStateSocketGateway } from "./gameState.socket";
import { PrismaModule } from "src/games/tiles-tbd/database/prisma.module";

@Module({
  controllers: [GameStateController],
  imports: [PrismaModule],
  providers: [GameStateService, GameStateSocketGateway]
})
export class GameStateModule {}
