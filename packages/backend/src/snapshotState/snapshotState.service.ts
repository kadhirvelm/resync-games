import {
  GameId,
  GameInfo,
  InitiateGameFromSnapshotResponse,
  Player,
  PlayerId,
  SnapshotId,
  SnapshotState,
  SnapshotStateDisplay
} from "@/imports/api";
import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 } from "uuid";
import { ResyncGamesPrismaService } from "../database/resyncGamesPrisma.service";
import { replacePlayerIds } from "./utils/replacePlayerIds";

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
        orderBy: {
          timestamp: "desc"
        },
        select: {
          description: true,
          gameType: true,
          snapshotId: true,
          timestamp: true
        }
      });

    return {
      snapshotStates: snapshotStates.map((s) =>
        this.prismaService.converterService.convertSnapshotDisplay(s)
      )
    };
  };

  public initiateGameFromSnapshot = async (
    snapshotStateDisplay: SnapshotStateDisplay
  ): Promise<InitiateGameFromSnapshotResponse> => {
    const snapshotState =
      await this.prismaService.client.snapshotState.findFirst({
        where: {
          snapshotId: snapshotStateDisplay.snapshotId
        }
      });
    if (snapshotState == null) {
      throw new NotFoundException("Snapshot state not found");
    }

    const gameState = snapshotState.gameSlice as unknown as {
      gameInfo: GameInfo;
      gameState: object;
    };

    const idMapping: Map<PlayerId, PlayerId> = new Map();
    const newPlayers = gameState.gameInfo.players.map((player): Player => {
      const newPlayerId = v4() as PlayerId;
      idMapping.set(player.playerId, newPlayerId);

      return {
        avatarCollection: player.avatarCollection,
        displayName: `${player.displayName}-snapshot`,
        playerId: newPlayerId
      };
    });

    await this.prismaService.client.player.createMany({
      data: newPlayers
    });

    const updatedGameState = replacePlayerIds(gameState.gameState, idMapping);

    const newGame = await this.prismaService.client.gameState.create({
      data: {
        PlayersInGame: {
          create: newPlayers.map((player) => ({
            playerId: player.playerId
          }))
        },
        currentGameState: "playing",
        gameConfiguration: gameState.gameInfo.gameConfiguration,
        gameState: updatedGameState,
        gameType: gameState.gameInfo.gameType,
        inviteCode: `NO_INVITE_CODE-${v4().slice(0, 5)}`,
        version: gameState.gameInfo.version
      },
      include: {
        PlayersInGame: {
          include: {
            player: true
          }
        }
      }
    });

    return {
      gameId: newGame.gameId as GameId,
      gameStateSlice: gameState.gameState as object,
      localStateSlice: snapshotState.localSlice as object,
      playerSlice: snapshotState.playerSlice as object,
      players: newPlayers.map((p) =>
        this.prismaService.converterService.convertPlayer(p)
      )
    };
  };
}
