import { Module } from "@nestjs/common";
import { GameStateTicker } from "./gameStateTicker.service";
import { GameStateModule } from "../gameState.module";
import { ResyncGamesPrismaModule } from "@/database/resyncGamesPrisma.module";

@Module({
  imports: [GameStateModule, ResyncGamesPrismaModule],
  providers: [GameStateTicker]
})
export class GameStateTickerModule {}
