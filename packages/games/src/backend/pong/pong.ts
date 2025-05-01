import { CreateGame, WithTimestamp } from "@/imports/api";
import { IGameServer } from "../base";

export interface PongGameState extends WithTimestamp {
  ball: {
    velocityX: number;
    velocityY: number;
    x: number;
    y: number;
  };
  leftPaddle: {
    x: number;
    y: number;
  };
  leftScore: number;
  rightPaddle: {
    x: number;
    y: number;
  };
  rightScore: number;
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
        lastUpdatedAt: new Date().toISOString(),
        leftPaddle: {
          x: 50,
          y: 400
        },
        leftScore: 0,
        rightPaddle: {
          x: 730,
          y: 400
        },
        rightScore: 0
      },
      version: createGameRequest.version
    };
  }
}
