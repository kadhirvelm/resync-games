import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { GamesModule } from "./games/games.module";
import { GameStateModule } from "./gameState/gameState.module";
import { GameStateGarbageCollectionModule } from "./gameState/garbageCollector/gameStateGarbageCollector.module";
import { GameStateTickerModule } from "./gameState/ticker/gameStateTicker.module";
import { HealthModule } from "./health/health.module";
import { AllExceptionsFilter } from "./library/AllExceptions.filter";
import { AppLoggerMiddleware } from "./library/AppLogger.middleware";
import { CustomWsExceptionFilter } from "./library/WsExceptions.filter";
import { UserModule } from "./user/user.module";

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
  providers: [AllExceptionsFilter, CustomWsExceptionFilter]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
