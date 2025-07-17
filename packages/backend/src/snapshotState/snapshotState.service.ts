import { Injectable } from "@nestjs/common";
import { SnapshotId, SnapshotState } from "@/imports/api";
import { ResyncGamesPrismaService } from "../database/resyncGamesPrisma.service";

@Injectable()
export class SnapshotStateService {
  public constructor(private prismaService: ResyncGamesPrismaService) {}

  public snapshotState = async (snapshotState: SnapshotState) => {
    const newEntry = await this.prismaService.client.snapshotState.create({
      data: {
        description: snapshotState.description,
        gameSlice: snapshotState.gameStateSlice,
        gameType: snapshotState.gameType,
        localSlice: snapshotState.localStateSlice,
        playerSlice: snapshotState.playerSlice
      }
    });

    return { snapshotId: newEntry.snapshotId as SnapshotId };
  };

  public getSnapshotStates = async () => {
    const snapshotStates =
      await this.prismaService.client.snapshotState.findMany({
        select: {
          description: true,
          gameType: true,
          timestamp: true
        }
      });

    return {
      snapshotStates: snapshotStates.map((s) =>
        this.prismaService.converterService.convertSnapshotDisplay(s)
      )
    };
  };
}
