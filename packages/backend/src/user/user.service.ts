import { ResyncGamesPrismaService } from "@/database/resyncGamesPrisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Player, PlayerId } from "@resync-games/api";

@Injectable()
export class UserService {
  constructor(private prismaModule: ResyncGamesPrismaService) {}

  public async getUser(playerId: PlayerId) {
    const maybeUser = await this.prismaModule.client.player.findFirst({
      where: {
        playerId: `${playerId}`
      }
    });

    if (maybeUser == null) {
      throw new BadRequestException(`User with playerId ${playerId} not found`);
    }

    return this.prismaModule.converterService.convertPlayer(maybeUser);
  }

  public async update(newPlayerDetails: Player) {
    const maybeUser = await this.prismaModule.client.player.update({
      data: {
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

  public async registerUser(playerId: PlayerId, displayName: string) {
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
        displayName,
        playerId
      }
    });

    return this.prismaModule.converterService.convertPlayer(newUser);
  }
}
