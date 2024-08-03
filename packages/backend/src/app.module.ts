import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { AppLoggerMiddleware } from "./library/Logger.middleware";
import { TileMapModule } from "./map/tileMap.module";

@Module({
  imports: [HealthModule, TileMapModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
