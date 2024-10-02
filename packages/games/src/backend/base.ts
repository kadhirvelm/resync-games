import { CreateGame, GameState } from "@resync-games/api";

export interface IGameServer {
  createGame: (createGameRequest: CreateGame) => GameState;
}
