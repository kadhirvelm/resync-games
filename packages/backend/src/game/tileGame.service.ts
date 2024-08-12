import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import * as _ from "lodash";
import {
  CreateTileGameRequest,
  MovePawnRequest,
  TileGameId
} from "@tiles-tbd/api";
import { TileMapService } from "src/map/tileMap.service";
import { TILE_GAME_PAWN_COLORS } from "./tileGame.constants";

@Injectable()
export class TileGameService {
  public constructor(
    private prismaService: PrismaService,
    private tileMapService: TileMapService
  ) {}

  public getAvailableGames = async () => {
    const allGames = await this.prismaService.client.tileGame.findMany({
      include: { tileMap: true }
    });
    const allMaps = _.uniqBy(
      allGames.flatMap((game) => game.tileMap),
      (map) => map.tileMapId
    );

    return {
      tileGames: allGames.map(
        this.prismaService.converterService.convertTileGame
      ),
      tileMaps: allMaps.map(this.prismaService.converterService.convertMap)
    };
  };

  public getTileGame = async (gameId: TileGameId) => {
    const game = await this.prismaService.client.tileGame.findUnique({
      include: { TilePawn: true },
      where: { tileGameId: gameId }
    });

    const tileGame = this.prismaService.converterService.convertTileGame(game);
    const pawns = game.TilePawn.flatMap((pawn) =>
      this.prismaService.converterService.convertTilePawn(pawn)
    );

    const tileMap = await this.tileMapService.getTileMap(tileGame.tileMapId);

    return {
      game: {
        ...tileGame,
        pawns
      },
      tileMap
    };
  };

  public createGame = async (initializeGameRequest: CreateTileGameRequest) => {
    const tileMap = await this.tileMapService.getTileMap(
      initializeGameRequest.tileMapId
    );

    const pawns = _.range(initializeGameRequest.numberOfPawns).map((index) => ({
      color: TILE_GAME_PAWN_COLORS[index],
      onTileId: tileMap.tileMap.startingTileId
    }));

    const newGame = await this.prismaService.client.tileGame.create({
      data: {
        TilePawn: {
          create: pawns
        },
        name: initializeGameRequest.name,
        state: "waiting",
        tileMapId: initializeGameRequest.tileMapId
      }
    });

    return {
      game: this.prismaService.converterService.convertTileGame(newGame)
    };
  };

  public movePawn = async (movePawnRequest: MovePawnRequest) => {
    const newPawnState = await this.prismaService.client.tilePawn.update({
      data: {
        onTileId: movePawnRequest.toTileId
      },
      where: {
        onTileId: movePawnRequest.fromTileId,
        tilePawnId: movePawnRequest.tilePawnId
      }
    });

    return {
      newPawnState:
        this.prismaService.converterService.convertTilePawn(newPawnState)
    };
  };
}
