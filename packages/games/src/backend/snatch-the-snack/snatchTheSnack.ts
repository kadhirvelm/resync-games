import { CompleteTileMap, CreateGame, TileId } from "@resync-games/api";
import { IGameServer } from "../base";
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

const colors = ["red", "blue", "yellow", "green"];

export class SnatchTheSnackServer implements IGameServer {
  async createGame(
    createGameRequest: CreateGame
  ): Promise<{ gameState: SnatchTheSnackGame; version: string }> {
    const allPawns = ["pawn1", "pawn2", "pawn3", "pawn4"] as PawnId[];

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
}
