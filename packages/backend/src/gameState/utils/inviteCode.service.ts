import { ResyncGamesPrismaService } from "@/database/resyncGamesPrisma.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import _ from "lodash";
import { INVITE_CODES } from "./inviteCodes.constant";
import { CurrentGameState } from "@resync-games/database";

@Injectable()
export class InviteCodeService {
  public constructor(private prismaService: ResyncGamesPrismaService) {}

  public getAvailableInviteCode = async (): Promise<string> => {
    const randomCode = this.generateRandomCode();

    const existingGameWithCode =
      await this.prismaService.client.gameState.findFirst({
        where: {
          currentGameState: CurrentGameState.waiting,
          inviteCode: randomCode
        }
      });
    if (existingGameWithCode != null) {
      return this.getAvailableInviteCode();
    }

    return randomCode.toLowerCase();
  };

  private generateRandomCode = () => {
    const randomCode = _.sample(INVITE_CODES);
    if (randomCode === undefined) {
      throw new InternalServerErrorException(
        "No invite code available. Please check the INVITE_CODES constant."
      );
    }

    return randomCode;
  };
}
