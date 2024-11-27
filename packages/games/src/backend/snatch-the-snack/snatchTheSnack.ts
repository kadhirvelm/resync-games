import {
  CompleteTileMap,
  CreateGame,
  CurrentGameState,
  PlayerInGame,
  TileId
} from "@resync-games/api";
import { ICanChangeToState, IGameServer } from "../base";
import { completedMap1 } from "./map1";
import { v4 } from "uuid";

export type PawnId = string & { __brand: "pawn-id" };

export interface SnatchTheSnackPawn {
  color: string;
  lastUpdatedAt: string | undefined;
  onTile: TileId;
  pawnId: PawnId;
}

export interface SnatchTheSnackGame {
  pawns: {
    [pawnId: PawnId]: SnatchTheSnackPawn;
  };
  tileMap: CompleteTileMap;
}

export interface SnatchTheSnackGameConfiguration {
  pawnCount: number;
}

const colors = ["red", "blue", "yellow", "green"];

export class SnatchTheSnackServer
  implements IGameServer<SnatchTheSnackGame, SnatchTheSnackGameConfiguration>
{
  public async createGame(
    createGameRequest: CreateGame<SnatchTheSnackGameConfiguration>
  ): Promise<{ gameState: SnatchTheSnackGame; version: string }> {
    const allPawns = Array.from({
      length: createGameRequest.gameConfiguration.pawnCount
    }).map((_, index) => `pawn${index + 1}` as PawnId);

    return {
      gameState: {
        pawns: Object.fromEntries(
          allPawns.map((_, index) => {
            const pawnId = v4() as PawnId;
            return [
              pawnId,
              {
                color: colors[index] ?? "red",
                lastUpdatedAt: undefined,
                onTile: completedMap1.tileMap.startingTileId,
                pawnId
              }
            ];
          })
        ),
        tileMap: completedMap1
      },
      version: createGameRequest.version
    };
  }

  public canChangeToState(
    game: ICanChangeToState<
      SnatchTheSnackGame,
      SnatchTheSnackGameConfiguration
    >,
    newCurrentGameState: CurrentGameState
  ) {
    if (newCurrentGameState === "playing") {
      return this.canStart(game.players);
    }

    return { canChange: true as const };
  }

  private canStart = (players: PlayerInGame[]) => {
    const playersNotOnTeam = players.filter(
      (player) => player.team === undefined
    );

    if (playersNotOnTeam.length !== 0) {
      return {
        canChange: false as const,
        reason: `Cannot start game with players not on a team: ${playersNotOnTeam.map((p) => p.displayName).join(", ")}, hurry up!`
      };
    }

    return { canChange: true as const };
  };
}
