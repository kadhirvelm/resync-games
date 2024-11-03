import { ResyncGamesPrismaService } from "@/database/resyncGamesPrisma.service";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class GameStateGarbageCollector {
  public constructor(private prismaService: ResyncGamesPrismaService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  public async garbageCollectGames() {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    await this.prismaService.client.gameState.updateMany({
      data: {
        currentGameState: "finished"
      },
      where: {
        currentGameState: {
          in: ["waiting", "playing"]
        },
        lastUpdatedAt: {
          lt: thirtyMinutesAgo
        }
      }
    });

    await this.prismaService.client.gameState.updateMany({
      data: {
        currentGameState: "finished"
      },
      where: {
        PlayersInGame: {
          none: {}
        }
      }
    });
  }
}
