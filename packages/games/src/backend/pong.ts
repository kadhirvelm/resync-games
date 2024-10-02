import { CreateGame } from "@resync-games/api";
import { IGameServer } from "./base";

export class PongGameServer implements IGameServer {
  async createGame(
    createGameRequest: CreateGame
  ): Promise<{ gameState: object; version: string }> {
    return {
      gameState: {
        score: {
          Player1: 0,
          Player2: 0
        }
      },
      version: createGameRequest.version
    };
  }
}
