import { ConfigurationService } from "@/configuration/configuration.service";
import { GameStateModule } from "@/gameState/gameState.module";
import { GameStateTickerModule } from "@/gameState/ticker/gameStateTicker.module";
import { DynamicModule, Logger, Module } from "@nestjs/common";

@Module({})
export class OrchestratorModule {
  static registerAsync(configService: ConfigurationService): DynamicModule {
    if (!configService.get("GAME_ORCHESTRATOR")) {
      return {
        module: OrchestratorModule
      };
    }

    // When we need more scale, we can separate out the non game orchestrator routes from the game orchestrator routes
    // and we can use nginx or some balancer to route traffic based on the game ID to the one of these game orchestrators

    // Note; a game orchestrator is one that both ticks the game + responds to active player requests. Both need the players
    // connected via websockets to the same instance to reduce the latency as much as possible

    const logger = new Logger("OrchestratorModule");
    logger.log("Identified orchestrator - loading additional modules.");

    return {
      imports: [GameStateTickerModule, GameStateModule],
      module: OrchestratorModule
    };
  }
}
