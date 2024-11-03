import { Module } from "@nestjs/common";
import { GameStateTicker } from "./gameStateTicker.service";

@Module({
  providers: [GameStateTicker]
})
export class GameStateTickerModule {}
