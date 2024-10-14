import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GamesModule } from "./games/games.module";
import { HealthModule } from "./health/health.module";
import { AllExceptionsFilter } from "./library/AllExceptions.filter";
import { AppLoggerMiddleware } from "./library/AppLogger.middleware";
import { GameStateModule } from "./gameState/gameState.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [HealthModule, GamesModule, GameStateModule, UserModule],
  providers: [AllExceptionsFilter]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
