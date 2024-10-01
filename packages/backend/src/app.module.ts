import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GamesModule } from "./games/games.module";
import { HealthModule } from "./health/health.module";
import { AllExceptionsFilter } from "./library/AllExceptions.filter";
import { AppLoggerMiddleware } from "./library/AppLogger.middleware";

@Module({
  imports: [HealthModule, GamesModule],
  providers: [AllExceptionsFilter]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
