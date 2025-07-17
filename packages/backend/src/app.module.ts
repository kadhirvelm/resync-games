import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigurationModule } from "./configuration/configuration.module";
import { ConfigurationService } from "./configuration/configuration.service";
import { GamesModule } from "./games/games.module";
import { GameStateGarbageCollectionModule } from "./gameState/garbageCollector/gameStateGarbageCollector.module";
import { HealthModule } from "./health/health.module";
import { AllExceptionsFilter } from "./library/AllExceptions.filter";
import { AppLoggerMiddleware } from "./library/AppLogger.middleware";
import { CustomWsExceptionFilter } from "./library/WsExceptions.filter";
import { OrchestratorModule } from "./orchestrator/orchestrator.module";
import { SnapshotStateModule } from "./snapshotState/snapshotState.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    HealthModule,
    ConfigurationModule,
    GamesModule,
    UserModule,
    GameStateGarbageCollectionModule,
    OrchestratorModule.registerAsync(new ConfigurationService()),
    ScheduleModule.forRoot(),
    SnapshotStateModule
  ],
  providers: [AllExceptionsFilter, CustomWsExceptionFilter]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
