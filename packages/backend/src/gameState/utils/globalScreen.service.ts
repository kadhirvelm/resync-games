import { ResyncGamesPrismaService } from "@/database/resyncGamesPrisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { GlobalGetGameState } from "@/imports/api";

@Injectable()
export class GlobalScreenService {
  public constructor(private prismaService: ResyncGamesPrismaService) {}

  public getGameState = async (getGameRequest: GlobalGetGameState) => {
    const requestedGame = await this.prismaService.client.gameState.findFirst({
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      },
      where: {
        gameId: getGameRequest.gameId,
        gameType: getGameRequest.gameType
      }
    });

    if (requestedGame == null) {
      throw new BadRequestException(
        "The requested game could not be found. Please check your request and try again."
      );
    }

    const allPlayers = requestedGame.PlayersInGame.map((p) => p.player);

    return this.prismaService.converterService.convertGameState(
      requestedGame,
      allPlayers,
      requestedGame.PlayersInGame
    );
  };
}
