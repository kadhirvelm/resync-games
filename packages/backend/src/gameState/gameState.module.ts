import { UserModule } from "@/user/user.module";
import { Module } from "@nestjs/common";
import { ResyncGamesPrismaModule } from "../database/resyncGamesPrisma.module";
import { GameStateController } from "./gameState.controller";
import { GameStateService } from "./gameState.service";
import { GameStateSocketGateway } from "./gameState.socket";
import { GlobalScreenController } from "./globalScreen.controller";
import { GameRegistryService } from "./utils/gameRegistry.service";
import { GamesInFlightService } from "./utils/gamesInFlight.service";
import { GlobalScreenService } from "./utils/globalScreen.service";
import { InviteCodeService } from "./utils/inviteCode.service";

@Module({
  controllers: [GameStateController, GlobalScreenController],
  exports: [GameStateService, GameRegistryService],
  imports: [ResyncGamesPrismaModule, UserModule],
  providers: [
    GameStateService,
    GameStateSocketGateway,
    GamesInFlightService,
    GameRegistryService,
    GlobalScreenService,
    InviteCodeService
  ]
})
export class GameStateModule {}
