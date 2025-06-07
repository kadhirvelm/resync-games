import { ResyncGamesPrismaService } from "@/database/resyncGamesPrisma.service";
import {
  GameId,
  Player,
  PlayerId,
  PlayerInGameWithDetails
} from "@/imports/api";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private prismaModule: ResyncGamesPrismaService) {}

  public async getUser(playerId: PlayerId): Promise<PlayerInGameWithDetails> {
    const maybeUser = await this.prismaModule.client.player.findFirst({
      where: {
        playerId: `${playerId}`
      }
    });

    if (maybeUser == null) {
      throw new BadRequestException(`User with playerId ${playerId} not found`);
    }

    const inGame = await this.prismaModule.client.playersInGame.findFirst({
      include: {
        game: {
          select: {
            gameId: true,
            gameType: true
          }
        }
      },
      where: {
        game: {
          currentGameState: {
            in: ["playing", "waiting"]
          }
        },
        playerId: playerId
      }
    });

    const playerInGame = this.prismaModule.converterService.convertPlayer(
      maybeUser,
      inGame ?? undefined
    );

    return {
      ...playerInGame,
      gameId: inGame?.gameId as GameId | undefined,
      gameType: inGame?.game.gameType,
      hasExited: inGame?.hasExited ?? true
    };
  }

  public async update(newPlayerDetails: Player) {
    const maybeUser = await this.prismaModule.client.player.update({
      data: {
        avatarCollection: newPlayerDetails.avatarCollection,
        displayName: newPlayerDetails.displayName
      },
      where: {
        playerId: newPlayerDetails.playerId
      }
    });

    if (maybeUser == null) {
      throw new BadRequestException(
        `User with playerId ${newPlayerDetails.playerId} not found`
      );
    }

    return this.prismaModule.converterService.convertPlayer(maybeUser);
  }

  public async registerUser({
    playerId,
    displayName,
    avatarCollection
  }: Player) {
    const maybeUser = await this.prismaModule.client.player.findFirst({
      where: {
        playerId
      }
    });

    if (maybeUser != null) {
      throw new BadRequestException(
        `User with playerId ${playerId} already exists`
      );
    }

    const newUser = await this.prismaModule.client.player.create({
      data: {
        avatarCollection,
        displayName,
        playerId
      }
    });

    return this.prismaModule.converterService.convertPlayer(newUser);
  }
}
