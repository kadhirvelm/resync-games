import { Service, ServiceDefinition } from "../genericTypes/service";
import {
  PawnId,
  TileGame,
  TileGameId,
  TileGameWithPawns
} from "./tileGame/types";
import { CompleteTileMap, TileId, TileMap, TileMapId } from "./tileMap/types";

export interface GetAvailableTileGamesResponse {
  tileGames: TileGame[];
  tileMaps: TileMap[];
}

export interface GetTileGameRequest {
  gameId: TileGameId;
}

export interface GetTileGameResponse {
  game: TileGameWithPawns;
  tileMap: CompleteTileMap;
}

export interface CreateTileGameRequest {
  name: string;
  numberOfPawns: number;
  tileMapId: TileMapId;
}

export interface CreateTileGameResponse {
  game: TileGame;
}

export interface MovePawnRequest {
  fromTileId: TileId;
  gameId: TileGameId;
  tilePawnId: PawnId;
  toTileId: TileId;
}

export interface MovePawnResponse {
  didMove: boolean;
}

export interface TileGameServiceApi extends Service {
  createGame: {
    payload: CreateTileGameRequest;
    response: CreateTileGameResponse;
  };
  getAvailableGames: {
    payload: Record<string, never>;
    response: GetAvailableTileGamesResponse;
  };
  getTileGame: {
    payload: GetTileGameRequest;
    response: GetTileGameResponse;
  };
  movePawn: {
    payload: MovePawnRequest;
    response: MovePawnResponse;
  };
}

export const TileGameServiceDefinition: ServiceDefinition<TileGameServiceApi> =
  {
    controller: "tile-game",
    endpoints: {
      createGame: "create-game",
      getAvailableGames: "get-available-games",
      getTileGame: "get-tile-game",
      movePawn: "move-pawn"
    }
  };
