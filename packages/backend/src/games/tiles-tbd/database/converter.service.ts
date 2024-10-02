import { Injectable } from "@nestjs/common";
import {
  CurrentGameState,
  Edge,
  EdgeId,
  GameId,
  GameState,
  GameType,
  PawnId,
  Player,
  PlayerId,
  Tile,
  TileGame,
  TileGameId,
  TileGameState,
  TileId,
  TileMap,
  TileMapId,
  TilePawn
} from "@resync-games/api";
import {
  TileMap as PrismaTileMap,
  Tile as PrismaTile,
  Edge as PrismaEdge,
  TileGame as PrismaTileGame,
  TilePawn as PrismaTilePawn,
  GameState as PrismaGameState,
  Player as PrismaPlayer
} from "@resync-games/database";

@Injectable()
export class ConverterService {
  public convertMap = (map: PrismaTileMap): TileMap => {
    return {
      startingTileId: map.startingTileId as TileId,
      tileMapId: map.tileMapId as TileMapId
    };
  };

  public convertTile = (tile: PrismaTile): Tile => {
    return {
      image: tile.image,
      posX: tile.posX,
      posY: tile.posY,
      tileId: tile.tileId as TileId,
      tileMapId: tile.tileMapId as TileMapId
    };
  };

  public convertEdge = (edge: PrismaEdge): Edge => {
    return {
      edgeId: edge.edgeId as EdgeId,
      flavorText: edge.flavorText,
      fromTileId: edge.fromTileId as TileId,
      toTileId: edge.toTileId as TileId
    };
  };

  public convertTileGame = (tileGame: PrismaTileGame): TileGame => {
    return {
      name: tileGame.name,
      state: tileGame.state as TileGameState,
      tileGameId: tileGame.tileGameId as TileGameId,
      tileMapId: tileGame.tileMapId as TileMapId
    };
  };

  public convertTilePawn = (tilePawn: PrismaTilePawn): TilePawn => {
    return {
      color: tilePawn.color,
      onTileId: tilePawn.onTileId as TileId,
      tilePawnId: tilePawn.tilePawnId as PawnId
    };
  };

  public convertGameState = (
    gameState: PrismaGameState,
    players: PrismaPlayer[]
  ): GameState => {
    return {
      ...gameState,
      currentGameState: gameState.currentGameState as CurrentGameState,
      gameConfiguration: gameState.gameConfiguration as object,
      gameId: gameState.gameId as GameId,
      gameState: gameState.gameState as object,
      gameType: gameState.gameType as GameType,
      lastUpdatedAt: gameState.lastUpdatedAt.toISOString(),
      players: players.map((p) => this.convertPlayer(p))
    };
  };

  public convertPlayer = (player: PrismaPlayer): Player => {
    return {
      ...player,
      playerId: player.playerId as PlayerId
    };
  };
}
