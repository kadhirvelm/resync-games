import { Module } from "@nestjs/common";
import { PrismaModule } from "src/games/tiles-tbd/database/prisma.module";
import { GameStateController } from "./gameState.controller";
import { GameStateService } from "./gameState.service";
import { GameStateSocketGateway } from "./gameState.socket";

@Module({
  controllers: [GameStateController],
  imports: [PrismaModule],
  providers: [GameStateService, GameStateSocketGateway]
})
export class GameStateModule {}
