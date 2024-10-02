import { CreateGame } from "@resync-games/api";

export interface IGameServer {
  createGame: (createGameRequest: CreateGame) => Promise<{
    gameState: object;
    version: string;
  }>;
}
