import { Injectable } from "@nestjs/common";
import {
  CurrentGameState,
  GameId,
  GameState,
  GameType,
  PlayerId
} from "@tiles-tbd/api";
import { GameState as PrismaGameState } from "@tiles-tbd/database";

@Injectable()
export class ConverterService {
  public convertGameState = (
    state: PrismaGameState,
    playerIds: PlayerId[]
  ): GameState => {
    return {
      currentGameState: state.currentGameState as CurrentGameState,
      gameConfiguration: state.gameConfiguration as object,
      gameId: state.gameId as GameId,
      gameState: state.gameState as object,
      gameType: state.gameType as GameType,
      playerIds,
      version: state.version as string
    };
  };
}
