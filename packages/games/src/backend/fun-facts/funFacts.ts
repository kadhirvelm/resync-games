import { PlayerId, PlayerInGame, WithTimestamp } from "@/imports/api";
import { IGameServer } from "../base";

export interface FunFact {
  /**
   * The player who submitted this fun fact.
   */
  submittedBy: PlayerInGame;
  /**
   * The fun fact text.
   */
  fact: string;
  /**
   * When this fun fact was submitted.
   */
  submittedAt: string;
}

export interface FunFactsPlayerSubmissions extends WithTimestamp {
  /**
   * The player who made these submissions.
   */
  player: PlayerInGame;
  /**
   * The fun facts submitted by this player.
   */
  facts: FunFact[];
}

/**
 * All fun facts submitted by all players in the game broken down by player.
 */
export interface FunFactsAllPlayerSubmissions {
  [playerId: PlayerId]: FunFactsPlayerSubmissions;
}

export interface FunFactsGame extends WithTimestamp {
  /**
   * All fun facts that have been submitted by players.
   */
  allFacts: FunFact[];
  /**
   * All submissions organized by player for easy lookup.
   */
  playerSubmissions: FunFactsAllPlayerSubmissions;
}

export interface FunFactsGameConfiguration {
  /**
   * The number of fun facts each player should submit.
   */
  factsPerPlayer: number;
}

export class FunFactsServer
  implements IGameServer<FunFactsGame, FunFactsGameConfiguration>
{
  public async createGame(): Promise<{
    gameState: FunFactsGame;
    version: "1.0.0";
  }> {
    return {
      gameState: {
        allFacts: [],
        lastUpdatedAt: new Date().toISOString(),
        playerSubmissions: {}
      },
      version: "1.0.0"
    };
  }
}
