import { ResyncGamesPrismaService } from "@/database/resyncGamesPrisma.service";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { GameStateAndInfo } from "@resync-games/api";
import { GameStateService } from "../gameState.service";
import { GameRegistryService } from "../utils/gameRegistry.service";

@Injectable()
export class GameStateTicker {
  public logger = new Logger("Game state ticker");

  public constructor(
    private prismaService: ResyncGamesPrismaService,
    private gameStateService: GameStateService,
    private gameRegistryService: GameRegistryService
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async tick() {
    const gamesInFlight = await this.prismaService.client.gameState.findMany({
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        currentGameState: "playing"
      }
    });

    if (gamesInFlight.length === 0) {
      this.logger.log(
        `Ticking on ${new Date().toLocaleString()}. No games active, skipping.`
      );
      return;
    }

    this.logger.log(
      `Ticking on ${new Date().toLocaleString()} for ${gamesInFlight.length} games`
    );
    for (const game of gamesInFlight) {
      this.tickGame(
        this.prismaService.converterService.convertGameState(
          game,
          game.PlayersInGame.map((p) => p.player),
          game.PlayersInGame
        )
      );
    }
  }

  private tickGame = async (game: GameStateAndInfo) => {
    const backend = this.gameRegistryService.getGameRegistry(game.gameType);
    const maybeNewGameState = await backend?.tickGameState?.(game);
    if (maybeNewGameState === undefined) {
      return;
    }

    const { didAcceptChange } = await this.gameStateService.updateGame({
      gameId: game.gameId,
      lastUpdatedAt: new Date().toISOString(),
      newGameState: maybeNewGameState,
      version: game.version
    });

    console.log(didAcceptChange);
  };
}
