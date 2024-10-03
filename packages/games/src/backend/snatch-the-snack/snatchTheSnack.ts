import { CompleteTileMap, CreateGame, TileId } from "@resync-games/api";
import { IGameServer } from "../base";
import { completedMap1 } from "./map1";

export type PawnId = string & { __brand: "pawn-id" };

export interface SnatchTheSnackPawn {
  color: string;
  id: string;
  onTile: TileId;
}

export interface SnatchTheSnackGame {
  pawns: {
    [pawnId: PawnId]: SnatchTheSnackPawn;
  };
  tileMap: CompleteTileMap;
}

export class SnatchTheSnackServer implements IGameServer {
  async createGame(
    createGameRequest: CreateGame
  ): Promise<{ gameState: SnatchTheSnackGame; version: string }> {
    const allPawns = ["pawn1", "pawn2", "pawn3", "pawn4"] as PawnId[];

    return {
      gameState: {
        pawns: Object.fromEntries(
          allPawns.map((pawnId) => [
            pawnId,
            {
              // TODO: change to a series of colors
              color: "red",
              // TODO: change to UUID
              id: (Math.random() * 1000).toString(),
              onTile: completedMap1.tileMap.startingTileId
            }
          ])
        ),
        tileMap: completedMap1
      },
      version: createGameRequest.version
    };
  }
}
