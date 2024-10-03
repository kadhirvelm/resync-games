import { Injectable } from "@nestjs/common";
import {
  CurrentGameState,
  GameId,
  GameState,
  GameType,
  Player,
  PlayerId
} from "@resync-games/api";
import {
  GameState as PrismaGameState,
  Player as PrismaPlayer
} from "@resync-games/game-state-database";
import _ from "lodash";

@Injectable()
export class GameStateConverterService {
  public convertGameState = (
    gameState: PrismaGameState,
    players: PrismaPlayer[]
  ): GameState => {
    return {
      ..._.omit(gameState, "PlayersInGame"),
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
