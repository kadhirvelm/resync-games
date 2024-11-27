import { CreateGame } from "@resync-games/api";
import { IGameServer } from "../base";

export interface PongGameState {
  ball: {
    velocityX: number;
    velocityY: number;
    x: number;
    y: number;
  };
  paddle: {
    x: number;
    y: number;
  };
  score: number;
}

export interface PongGameConfiguration {}

export class PongGameServer
  implements IGameServer<PongGameState, PongGameConfiguration>
{
  async createGame(
    createGameRequest: CreateGame
  ): Promise<{ gameState: PongGameState; version: string }> {
    return {
      gameState: {
        ball: {
          velocityX: 150,
          velocityY: -150,
          x: 390,
          y: 290
        },
        paddle: {
          x: 350,
          y: 550
        },
        score: 0
      },
      version: createGameRequest.version
    };
  }
}
