import { IGameServer } from "../base";

export interface TriviaGameConfiguration {
  /**
   * The total number of rounds in the game.
   */
  totalRounds: number;
}

export interface TriviaGame {
  score: 0;
}

export class TriviaServer
  implements IGameServer<TriviaGame, TriviaGameConfiguration>
{
  public async createGame(): Promise<{
    gameState: TriviaGame;
    version: "1.0.0";
  }> {
    return {
      gameState: {
        score: 0
      },
      version: "1.0.0"
    };
  }
}
