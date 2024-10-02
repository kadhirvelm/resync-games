import { Module } from "@nestjs/common";
import { GameStatePrismaModule } from "./database/gameStatePrisma.module";
import { GameStateController } from "./gameState.controller";
import { GameStateService } from "./gameState.service";
import { GameStateSocketGateway } from "./gameState.socket";
import { GamesInFlightService } from "./utils/gamesInFlight.service";

@Module({
  controllers: [GameStateController],
  imports: [GameStatePrismaModule],
  providers: [GameStateService, GameStateSocketGateway, GamesInFlightService]
})
export class GameStateModule {}
