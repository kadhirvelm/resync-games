import { Module } from "@nestjs/common";
import { ResyncGamesPrismaModule } from "../database/resyncGamesPrisma.module";
import { GameStateController } from "./gameState.controller";
import { GameStateService } from "./gameState.service";
import { GameStateSocketGateway } from "./gameState.socket";
import { GamesInFlightService } from "./utils/gamesInFlight.service";
import { UserModule } from "@/user/user.module";

@Module({
  controllers: [GameStateController],
  imports: [ResyncGamesPrismaModule, UserModule],
  providers: [GameStateService, GameStateSocketGateway, GamesInFlightService]
})
export class GameStateModule {}
