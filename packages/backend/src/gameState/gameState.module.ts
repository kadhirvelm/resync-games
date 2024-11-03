import { Module } from "@nestjs/common";
import { ResyncGamesPrismaModule } from "../database/resyncGamesPrisma.module";
import { GameStateController } from "./gameState.controller";
import { GameStateService } from "./gameState.service";
import { GameStateSocketGateway } from "./gameState.socket";
import { GamesInFlightService } from "./utils/gamesInFlight.service";
import { UserModule } from "@/user/user.module";
import { GameRegistryService } from "./utils/gameRegistry.service";

@Module({
  controllers: [GameStateController],
  exports: [GameStateService, GameRegistryService],
  imports: [ResyncGamesPrismaModule, UserModule],
  providers: [
    GameStateService,
    GameStateSocketGateway,
    GamesInFlightService,
    GameRegistryService
  ]
})
export class GameStateModule {}
