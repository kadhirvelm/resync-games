import { ResyncGamesPrismaService } from "@/database/resyncGamesPrisma.service";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { GameStateAndInfo, PlayerId } from "@resync-games/api";
import { GameStateService } from "../gameState.service";
import { GameRegistryService } from "../utils/gameRegistry.service";

const EVERY_3_SECONDS = "*/3 * * * * *";

@Injectable()
export class GameStateTicker {
  public logger = new Logger("Game state ticker");

  public constructor(
    private prismaService: ResyncGamesPrismaService,
    private gameStateService: GameStateService,
    private gameRegistryService: GameRegistryService
  ) {}

  @Cron(EVERY_3_SECONDS)
  public async tick() {
    this.logger.log(`Ticking on ${new Date().toLocaleString()}`);

    try {
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
    } catch (error) {
      this.logger.error(`Error ticking: ${JSON.stringify(error)}`);
    }
  }

  private tickGame = async (game: GameStateAndInfo) => {
    try {
      const backend = this.gameRegistryService.getGameRegistry(game.gameType);
      const maybeNewGameState = await backend?.tickGameState?.(game);
      if (maybeNewGameState === undefined) {
        return;
      }

      const { gameState, hasFinished } = maybeNewGameState;

      if (gameState !== undefined) {
        await this.gameStateService.updateGame({
          gameId: game.gameId,
          lastUpdatedAt: new Date().toISOString(),
          newGameState: gameState,
          version: game.version
        });
      }

      if (hasFinished) {
        await this.gameStateService.changeGameState({
          currentGameState: "finished",
          gameId: game.gameId,
          gameType: game.gameType,
          playerId: "GAME_TICKER" as PlayerId
        });
      }
    } catch (error) {
      this.logger.error(
        `Error ticking game: ${JSON.stringify(error)} on ${JSON.stringify(game)}`
      );
    }
  };
}
