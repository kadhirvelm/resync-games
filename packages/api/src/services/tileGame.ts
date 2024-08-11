import { Service, ServiceDefinition } from "../genericTypes/service";
import { CompleteTileMap, TileMap, TileMapId } from "./tileMap/types";
import { TileGame, TileGameId, TileGameWithPawns } from "./tileGame/types";

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

export interface InitializeTileGameRequest {
  name: string;
  numberOfPawns: number;
  tileMapId: TileMapId;
}

export interface InitializeTileGameResponse {
  game: TileGame;
}

export interface TileGameServiceApi extends Service {
  getAvailableGames: {
    payload: Record<string, never>;
    response: GetAvailableTileGamesResponse;
  };
  getTileGame: {
    payload: GetTileGameRequest;
    response: GetTileGameResponse;
  };
  initializeGame: {
    payload: InitializeTileGameRequest;
    response: InitializeTileGameResponse;
  };
}

export const TileGameServiceDefinition: ServiceDefinition<TileGameServiceApi> =
  {
    controller: "tile-game",
    endpoints: {
      getAvailableGames: "get-available-games",
      getTileGame: "get-tile-game",
      initializeGame: "initialize-game"
    }
  };
