import { GameStateAndInfo } from "@resync-games/api";
import { IGameServer } from "../base";

export interface SpiritGathererCycle {
  cycleNumber: number;
  nextCycleStart: number;
  state: "playing" | "paused";
}

export interface SpiritGathererGame {
  cycle: SpiritGathererCycle;
}

export interface SpiritGathererGameConfiguration {
  numberOfRounds: number;
}

export class SpiritGathererServer
  implements IGameServer<SpiritGathererGame, SpiritGathererGameConfiguration>
{
  public async createGame(): Promise<{
    gameState: SpiritGathererGame;
    version: string;
  }> {
    return {
      gameState: {
        cycle: {
          cycleNumber: 0,
          nextCycleStart: Date.now() + 10000,
          state: "playing"
        }
      },
      version: "1.0.0"
    };
  }

  public canChangeToState() {
    return { canChange: true as const };
  }

  public tickGameState(
    gameStateAndInfo: GameStateAndInfo<
      SpiritGathererGame,
      SpiritGathererGameConfiguration
    >
  ) {
    // console.log("Ticking game state", gameStateAndInfo);
    return {
      gameState: gameStateAndInfo.gameState,
      hasFinished: false
    };
  }
}
