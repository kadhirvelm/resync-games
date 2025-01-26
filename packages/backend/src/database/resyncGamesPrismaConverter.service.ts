import { Injectable } from "@nestjs/common";
import {
  CurrentGameState,
  GameId,
  GameStateAndInfo,
  GameType,
  PlayerId,
  PlayerInGame
} from "@resync-games/api";
import {
  PlayersInGame,
  GameState as PrismaGameState,
  Player as PrismaPlayer,
  PlayersInGame as PrismaPlayerInGame
} from "@resync-games/database";
import _ from "lodash";

@Injectable()
export class ResyncGamesConverterService {
  public convertGameState = (
    gameState: PrismaGameState,
    players: PrismaPlayer[],
    playersInGame: PlayersInGame[]
  ): GameStateAndInfo => {
    const indexedPlayersInGame = _.keyBy(playersInGame, "playerId");

    return {
      ..._.omit(gameState, "PlayersInGame"),
      currentGameState: gameState.currentGameState as CurrentGameState,
      gameConfiguration: gameState.gameConfiguration as object,
      gameId: gameState.gameId as GameId,
      gameState: gameState.gameState as object,
      gameType: gameState.gameType as GameType,
      lastUpdatedAt: gameState.lastUpdatedAt.toISOString(),
      players: players.map((p) =>
        this.convertPlayer(p, indexedPlayersInGame[p.playerId])
      )
    };
  };

  public convertPlayer = (
    player: PrismaPlayer,
    playerInGame?: PrismaPlayerInGame
  ): PlayerInGame => {
    return {
      ...player,
      connectionStatus: playerInGame?.connectionStatus,
      playerId: player.playerId as PlayerId,
      team: playerInGame?.team ?? undefined
    };
  };
}
