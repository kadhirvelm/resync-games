import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { AppLoggerMiddleware } from "./library/Logger.middleware";
import { TileMapModule } from "./map/tileMap.module";
import { AllExceptionsFilter } from "./filters/exception.filter";

@Module({
  imports: [HealthModule, TileMapModule],
  providers: [AllExceptionsFilter]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
