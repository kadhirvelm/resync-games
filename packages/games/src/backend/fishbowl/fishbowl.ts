import { PlayerId, WithTimestamp } from "@/imports/api";
import { IGameServer } from "../base";

export interface FishbowlPlayer {
  /**
   * The player's unique ID.
   */
  playerId: PlayerId;
  /**
   * The player's team number.
   */
  teamNumber: string;
}

export interface FishbowlActiveTracker extends WithTimestamp {
  /**
   * The time in milliseconds that the player has in total for the round. Combine this with the seed time and the start time to get the end time.
   */
  countdownTimer: number;
  /**
   * The time in milliseconds that have elapsed before the game was paused. This is used to calculate the countdown timer when the game is resumed.
   */
  seedTime: number;
  /**
   * The time in milliseconds that the player's round started. This plus the seed time should equal the end time.
   */
  startTime: string;
  /**
   * The current state of the round. This is used to determine if the game is paused, running, or stopped.
   */
  state: "paused" | "running" | "stopped";
}

export interface FishbowlActivePlayer extends WithTimestamp {
  /**
   * The player who is currently giving clues.
   */
  player: FishbowlPlayer;
  /**
   * The tracker for how long the player has left in the round.
   */
  timer: FishbowlActiveTracker;
}

export interface FishbowlSingleGuess {
  /**
   * The player who was giving clues when this guess was made.
   */
  currentActivePlayer: FishbowlPlayer;
  /**
   * The actual guess that was made.
   */
  guess: string;
  /**
   * The player who made the guess.
   */
  guessingPlayer: FishbowlPlayer;
  /**
   * The round number that this guess was made in.
   */
  roundNumber: number;
  /**
   * When the guess was made.
   */
  timestamp: string;
}

export interface FishbowlRound extends WithTimestamp {
  /**
   * All correct guesses for this round. Here for player reference.
   */
  correctGuesses: FishbowlSingleGuess[];
  /**
   * The player who is currently giving clues.
   */
  currentActivePlayer: FishbowlActivePlayer;
  /**
   * The word the player is currently giving clues for.
   */
  currentActiveWord: FishbowlWord;
  /**
   * Remaining words for the round. This is used to determine if the round is over or not.
   */
  remainingWords: FishbowlWord[];
  /**
   * The current round number. This is used to determine if the game is over or not.
   */
  roundNumber: number;
}

export interface FishbowlSinglePlayerGuesses extends WithTimestamp {
  /**
   * The guesses that the player has made in this round.
   */
  guesses: FishbowlSingleGuess[];
  /**
   * The player who made the guesses.
   */
  player: FishbowlPlayer;
}

/**
 * All guesses made by all players in the game broken down by round.
 */
export interface FishbowlAllPlayerGuesses {
  [playerId: PlayerId]: {
    [roundNumber: number]: FishbowlSinglePlayerGuesses;
  };
}

/**
 * A word that has been contributed by a player.
 */
export interface FishbowlWord {
  /**
   * The player who contributed the word.
   */
  contributedBy: FishbowlPlayer;
  /**
   * The word itself.
   */
  word: string;
}

export interface FishbowlSinglePlayerContributions extends WithTimestamp {
  /**
   * The player who contributed the words.
   */
  player: FishbowlPlayer;
  /**
   * The words that the player has contributed.
   */
  words: FishbowlWord[];
}

/**
 * All words contributed by all players in the game broken down by player.
 */
export interface FishbowlAllPlayerContributions {
  [playerId: PlayerId]: FishbowlSinglePlayerContributions;
}

export interface FishbowlGame extends WithTimestamp {
  /**
   * All the words that have been contributed by all players. These are the words that will be used for the game.
   */
  gameWords: FishbowlWord[];
  /**
   * All the guesses that have been made by all players in the game.
   */
  playerGuesses: FishbowlAllPlayerGuesses;
  /**
   * All the words that have been contributed by all players in the game.
   */
  playerWordContributions: FishbowlAllPlayerContributions;
  /**
   * The current round of the game. It will be undefined if the game is collecting words from players.
   */
  round: FishbowlRound | undefined;
  /**
   * The turn order of the players. This is used to determine the next player to give clues.
   */
  turnOrder: PlayerId[];
}

export interface FishbowlGameConfiguration {
  /**
   * How much time each player has to give clues in each round. This is used to determine how long each round will last.
   */
  timePerPlayer: {
    [roundNumber: number]: number;
  };
  /**
   * The total number of rounds in the game.
   */
  totalRounds: number;
  /**
   * The number of words that each player will contribute to the game.
   */
  wordsPerPlayer: number;
}

export class FishbowlServer
  implements IGameServer<FishbowlGame, FishbowlGameConfiguration>
{
  public async createGame(): Promise<{
    gameState: FishbowlGame;
    version: "1.0.0";
  }> {
    return {
      gameState: {
        gameWords: [],
        lastUpdatedAt: new Date().toISOString(),
        playerGuesses: {},
        playerWordContributions: {},
        round: undefined,
        turnOrder: []
      },
      version: "1.0.0"
    };
  }
}
