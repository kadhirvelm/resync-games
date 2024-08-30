import { Injectable } from "@nestjs/common";
import {
  CreateTileGameRequest,
  MovePawnRequest,
  TileGameId
} from "@tiles-tbd/api";
import * as _ from "lodash";
import { PrismaService } from "src/database/prisma.service";
import { TileMapService } from "src/map/tileMap.service";
import { SocketGateway } from "src/socket/socket.gateway";
import { TILE_GAME_PAWN_COLORS } from "./tileGame.constants";
import { TileGame } from "@tiles-tbd/database";

@Injectable()
export class TileGameService {
  public constructor(
    private prismaService: PrismaService,
    private tileMapService: TileMapService,
    private socketGateway: SocketGateway
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

    // Get the group of the starting tile
    const startingTile = tileMap.tiles.find(
      (tile) => tile.tileId === tileMap.tileMap.startingTileId
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
        tileMapId: initializeGameRequest.tileMapId,
        visitedTileGroupIds: [startingTile.tileGroupId]
      }
    });

    return {
      game: this.prismaService.converterService.convertTileGame(newGame)
    };
  };

  public movePawn = async (movePawnRequest: MovePawnRequest) => {
    const newPawnState = await this.prismaService.client.tilePawn.update({
      data: {
        onTileId: movePawnRequest.toTileId,
        tileGameId: movePawnRequest.gameId
      },
      where: {
        onTileId: movePawnRequest.fromTileId,
        tilePawnId: movePawnRequest.tilePawnId
      }
    });

    const didMove = newPawnState.onTileId === movePawnRequest.toTileId;
    if (!didMove) {
      return {
        didMove: false
      };
    }

    // Find the tile group of the new tile and mark it as visited in the game if it's not already
    const newTile = await this.prismaService.client.tile.findUnique({
      where: {
        tileId: movePawnRequest.toTileId
      }
    });

    // Fetch the visited tile groups
    const game: TileGame = await this.prismaService.client.tileGame.findUnique({
      where: {
        tileGameId: movePawnRequest.gameId
      }
    });

    const visitedTileGroups = new Set(game.visitedTileGroupIds);
    visitedTileGroups.add(newTile.tileGroupId);
    // Update
    await this.prismaService.client.tileGame.update({
      data: {
        visitedTileGroupIds: Array.from(visitedTileGroups)
      },
      where: {
        tileGameId: movePawnRequest.gameId
      }
    });
    console.log(`Visited tile groups: ${Array.from(visitedTileGroups)}`);

    const pawns = await this.prismaService.client.tilePawn.findMany({
      where: {
        tileGameId: movePawnRequest.gameId
      }
    });

    this.socketGateway.updatePawnState({
      pawnState: pawns.map(this.prismaService.converterService.convertTilePawn)
    });

    this.socketGateway.updateGameState({
      gameState: this.prismaService.converterService.convertTileGame({ ...game, visitedTileGroupIds: Array.from(visitedTileGroups) })
    })

    return {
      didMove: true
    };
  };
}
