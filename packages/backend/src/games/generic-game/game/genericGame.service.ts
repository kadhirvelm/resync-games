import { Injectable } from "@nestjs/common";
import {
  AvailableGames,
  CreateGameRequest,
  GameId,
  GameState,
  GameType,
  PlayerId
} from "@tiles-tbd/api";
import * as _ from "lodash";
import { PrismaService } from "src/games/tiles-tbd/database/prisma.service";
import { GenericGameSocketGateway } from "../socket/genericGameSocket.gateway";

@Injectable()
export class GenericGameService {
  public constructor(
    private prismaService: PrismaService,
    private socketGateway: GenericGameSocketGateway
  ) {}

  public getAvailableGames = async (): Promise<AvailableGames> => {
    const allGames = await this.prismaService.client.gameState.findMany({
      select: {
        gameId: true,
        gameType: true,
        players: {
          select: {
            playerId: true
          }
        }
      }
    });

    return {
      games: allGames.map((game) => ({
        gameId: game.gameId as GameId,
        gameType: game.gameType as GameType,
        playerIds: game.players.map((player) => player.playerId as PlayerId)
      }))
    };
  };

  public createGame = async (
    initializeGameRequest: CreateGameRequest
  ): Promise<GameState> => {
    // TODO: Call the createGame method of the respective game implementation to get the initial game state.
    // Then commit it to the DB and return.
    return {} as GameState;
  };
}
