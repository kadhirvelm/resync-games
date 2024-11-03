import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class GameStateTicker {
  public logger = new Logger("Game state ticker");

  @Cron(CronExpression.EVERY_5_SECONDS)
  public tick() {
    this.logger.log("Tick");
  }
}
