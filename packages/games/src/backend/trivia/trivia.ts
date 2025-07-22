import {
  CurrentGameState,
  GameStateAndInfo,
  PlayerId,
  WithTimestamp
} from "@/imports/api";
import { ICanChangeToState, IGameServer, TickGameState } from "../base";

export interface TriviaGameConfiguration {
  /**
   * The total number of rounds in the game.
   */
  totalRounds: number;
}

/**
 * The scores of all players in the game.
 */
export type TriviaGameScores = Record<PlayerId, number>;

/**
 * The guesses made by players in a round.
 */
export type PlayerGuesses = Record<PlayerId, string>;

/**
 * The submitted by players in a round.
 */
export type PlayerAnswers = Record<PlayerId, string>;

export interface BaseTriviaRound extends WithTimestamp {
  hasFinished: boolean;
  type: string;
}

export interface FibbageRound extends BaseTriviaRound {
  /**
   * The answers submitted by players.
   * Each key is a player ID and the value is the answer they submitted.
   * The answers are not guaranteed to be unique.
   */
  answers: PlayerAnswers;
  /**
   * The correct answer for the round.
   */
  correctAnswer: string;
  /**
   * The guesses made by players.
   */
  guesses: PlayerGuesses;
  /**
   * The question for the round.
   */
  question: string;
  /**
   * The round number.
   */
  roundNumber: number;
  /**
   * Status of the round.
   */
  state: "waiting-for-answers" | "waiting-for-guesses" | "finished";
  type: "fibbage";
}

export type TriviaRound = FibbageRound;

export interface TriviaGame extends WithTimestamp {
  rounds: Record<number, TriviaRound>;
  scores: TriviaGameScores;
}

const FIBBAGE_QUESTIONS: { answer: string; question: string }[] = [
  {
    answer: "Garden Hermit",
    question:
      "In the 19th century, wealthy estate owners would sometimes hire a person to live in a small shack in their garden and not wash for years. This person was known as a ______."
  },
  {
    answer: "Backrub",
    question:
      "The original name for the search engine that would eventually become Google was ______."
  },
  {
    answer: "Arachibutyrophobia",
    question:
      "The fear of having peanut butter stick to the roof of your mouth is called ______."
  },
  {
    answer: "Guinea Pig",
    question:
      "In Switzerland, it is illegal to own just one ______ because they are prone to loneliness."
  },
  {
    answer: "Milk",
    question: "The official state beverage of Kentucky is ______."
  },
  {
    answer: "Grumble",
    question: "A group of pugs is called a ______."
  },
  {
    answer: "Lego",
    question:
      "By number of tires produced, the world's largest tire manufacturer is ______."
  }
];

export class TriviaServer
  implements IGameServer<TriviaGame, TriviaGameConfiguration>
{
  public async createGame(): Promise<{
    gameState: TriviaGame;
    version: "1.0.0";
  }> {
    return {
      gameState: {
        lastUpdatedAt: new Date().toISOString(),
        rounds: {},
        scores: {}
      },
      version: "1.0.0"
    };
  }

  public onChangeState(
    game: ICanChangeToState<TriviaGame, TriviaGameConfiguration>,
    newCurrentGameState: CurrentGameState
  ): TriviaGame | undefined {
    if (newCurrentGameState !== "playing") {
      return;
    }

    // Initialize with a fibbage round.
    const previousRounds = Object.values(game.gameState.rounds);
    const round = this.initializeFibbageRound(0, previousRounds);

    return {
      ...game.gameState,
      rounds: game.gameState.rounds
        ? {
            ...game.gameState.rounds,
            [round.roundNumber]: round
          }
        : {
            [round.roundNumber]: round
          }
    };
  }

  public onGameStateChange(
    nextGameState: GameStateAndInfo<TriviaGame, TriviaGameConfiguration>
  ):
    | TickGameState<TriviaGame>
    | Promise<TickGameState<TriviaGame> | undefined>
    | undefined {
    const { gameState, gameConfiguration } = nextGameState;
    if (Object.keys(gameState.rounds).length === 0) {
      return {
        gameState,
        hasFinished: false
      };
    }

    const maxRounds = gameConfiguration.totalRounds;
    const currentRoundNumber = Object.keys(gameState.rounds).length - 1;
    const curRound = gameState.rounds[currentRoundNumber];
    const numPlayers = nextGameState.players.length;
    if (curRound === undefined) {
      throw new Error("Current round not found in game state.");
    }
    const { newRound, newScores } = this.processCurrentRound(
      curRound,
      gameState.scores,
      numPlayers
    );

    return {
      gameState: {
        ...gameState,
        rounds: {
          ...gameState.rounds,
          [currentRoundNumber]: newRound
        },
        scores: newScores
      },
      hasFinished: newRound.hasFinished && currentRoundNumber + 1 >= maxRounds
    };
  }

  private processCurrentRound(
    round: TriviaRound,
    currentScores: TriviaGameScores,
    numPlayers: number
  ): {
    newRound: TriviaRound;
    newScores: TriviaGameScores;
  } {
    // delegate by round type
    if (round.type === "fibbage") {
      return this.processCurrentFibbageRound(
        round as FibbageRound,
        currentScores,
        numPlayers
      );
    }
    throw new Error(`Unsupported round type "${round.type}" for processing.`);
  }

  /**
   * Handle state transitions and scoring for a Fibbage round.
   */
  private processCurrentFibbageRound(
    fibbageRound: FibbageRound,
    currentScores: TriviaGameScores,
    numPlayers: number
  ): { newRound: FibbageRound; newScores: TriviaGameScores } {
    const answerCount = Object.keys(fibbageRound.answers).length;
    const guessCount = Object.keys(fibbageRound.guesses).length;
    const now = new Date().toISOString();

    // still collecting answers
    if (
      answerCount < numPlayers &&
      fibbageRound.state === "waiting-for-answers"
    ) {
      return {
        newRound: {
          ...fibbageRound,
          lastUpdatedAt: now,
          state: "waiting-for-answers"
        },
        newScores: currentScores
      };
    }

    // move to guessing once all answers in
    if (
      answerCount >= numPlayers &&
      fibbageRound.state === "waiting-for-answers"
    ) {
      return {
        newRound: {
          ...fibbageRound,
          lastUpdatedAt: now,
          state: "waiting-for-guesses"
        },
        newScores: currentScores
      };
    }

    // still collecting guesses
    if (
      guessCount < numPlayers &&
      fibbageRound.state === "waiting-for-guesses"
    ) {
      return {
        newRound: {
          ...fibbageRound,
          lastUpdatedAt: now,
          state: "waiting-for-guesses"
        },
        newScores: currentScores
      };
    }

    // all guesses in → finalize scores
    const newScores: TriviaGameScores = { ...currentScores };
    // +100 for correct‐answer guesses
    Object.entries(fibbageRound.guesses).forEach(([pid, guess]) => {
      if (guess === fibbageRound.correctAnswer) {
        newScores[pid as PlayerId] = (newScores[pid as PlayerId] || 0) + 100;
      }
    });
    // map each fake answer back to its author
    const authorByAnswer: Record<string, string> = {};
    Object.entries(fibbageRound.answers).forEach(([pid, ans]) => {
      authorByAnswer[ans] = pid;
    });
    // +50 for each time a fake answer fooled someone
    Object.entries(fibbageRound.guesses).forEach(([pid, guess]) => {
      if (guess !== fibbageRound.correctAnswer) {
        const author = authorByAnswer[guess];
        if (author && author !== pid) {
          newScores[author as PlayerId] =
            (newScores[author as PlayerId] || 0) + 50;
        }
      }
    });

    const newRound: FibbageRound = {
      ...fibbageRound,
      hasFinished: true,
      lastUpdatedAt: now,
      state: "finished"
    };
    return { newRound, newScores };
  }

  /**
   * A Fibbage round consists of a random weird question that players are not really supposed to know the answer to.
   * Players will submit answers that they think are plausible, and then other players will guess which answer is the
   * correct one.
   * Players get points for guessing the correct answer and for fooling other players with their answers.
   * @returns A new Fibbage round.
   */
  private initializeFibbageRound(
    roundNumber: number,
    existingRounds: TriviaRound[]
  ): FibbageRound {
    const existingQuestions = new Set(
      existingRounds
        .filter((round) => round.type === "fibbage")
        .map((round) => (round as FibbageRound).question)
    );
    const availableQuestions = FIBBAGE_QUESTIONS.filter(
      (q) => !existingQuestions.has(q.question)
    );

    const selectedQuestion =
      availableQuestions[
        Math.floor(Math.random() * availableQuestions.length)
      ] || FIBBAGE_QUESTIONS[0];

    if (!selectedQuestion) {
      throw new Error("No available questions for the Fibbage round.");
    }

    return {
      answers: {},
      correctAnswer: selectedQuestion.answer,
      guesses: {},
      hasFinished: false,
      lastUpdatedAt: new Date().toISOString(),
      question: selectedQuestion.question,
      roundNumber,
      state: "waiting-for-answers",
      type: "fibbage"
    };
  }
}
