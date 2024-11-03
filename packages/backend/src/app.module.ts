import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GamesModule } from "./games/games.module";
import { HealthModule } from "./health/health.module";
import { AllExceptionsFilter } from "./library/AllExceptions.filter";
import { AppLoggerMiddleware } from "./library/AppLogger.middleware";
import { GameStateModule } from "./gameState/gameState.module";
import { UserModule } from "./user/user.module";
import { ScheduleModule } from "@nestjs/schedule";
import { GameStateTickerModule } from "./gameState/ticker/gameStateTicker.module";
import { GameStateGarbageCollectionModule } from "./gameState/garbageCollector/gameStateGarbageCollector.module";

@Module({
  imports: [
    HealthModule,
    GamesModule,
    GameStateModule,
    UserModule,
    GameStateTickerModule,
    GameStateGarbageCollectionModule,
    ScheduleModule.forRoot()
  ],
  providers: [AllExceptionsFilter]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
