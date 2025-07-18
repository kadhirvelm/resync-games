import { Injectable } from "@nestjs/common";
import {
  GameId,
  GameType,
  PlayerInGame,
  PlayerId,
  GameStateAndInfo,
  SnapshotState,
  SnapshotStateDisplay,
  SnapshotId
} from "@/imports/api";
import {
  CurrentGameState,
  PlayersInGame,
  GameState as PrismaGameState,
  Player as PrismaPlayer,
  PlayersInGame as PrismaPlayerInGame,
  SnapshotState as PrismaSnapshotState
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
      team: playerInGame?.team ?? 0
    };
  };

  public convertSnapshotState = (
    snapshotState: PrismaSnapshotState
  ): SnapshotState => {
    return {
      description: snapshotState.description,
      gameStateSlice: snapshotState.gameSlice as object,
      gameType: snapshotState.gameType as GameType,
      localStateSlice: snapshotState.localSlice as object,
      playerSlice: snapshotState.playerSlice as object,
      snapshotId: snapshotState.snapshotId as SnapshotId,
      timestamp: snapshotState.timestamp.toISOString()
    };
  };

  public convertSnapshotDisplay = (
    snapshotState: Partial<PrismaSnapshotState>
  ): SnapshotStateDisplay => {
    return {
      description: snapshotState.description ?? "",
      gameType: snapshotState.gameType as GameType,
      snapshotId: snapshotState.snapshotId as SnapshotId,
      timestamp: snapshotState.timestamp?.toISOString() ?? ""
    };
  };
}
