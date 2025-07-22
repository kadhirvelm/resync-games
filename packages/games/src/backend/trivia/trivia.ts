import { CurrentGameState, PlayerId, WithTimestamp } from "@/imports/api";
import { ICanChangeToState, IGameServer } from "../base";

export interface TriviaGameConfiguration {
  /**
   * The total number of rounds in the game.
   */
  totalRounds: number;
}

export interface TriviaGameScores {
  /**
   * The scores of all players in the game.
   */
  [playerId: PlayerId]: number;
}

export interface PlayerGuesses {
  /**
   * The guesses made by players in a round.
   */
  [playerId: PlayerId]: string;
}

export interface PlayerAnswers {
  /**
   * The submitted by players in a round.
   */
  [playerId: PlayerId]: string;
}

export interface FibbageRound extends WithTimestamp {
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

  /**
   * A Fibbage round consists of a random weird question that players are not really supposed to know the answer to.
   * Players will submit answers that they think are plausible, and then other players will guess which answer is the
   * correct one.
   * Players get points for guessing the correct answer and for fooling other players with their answers.
   * @returns A new Fibbage round.
   */
  private initializeFibbageRound(
    roundNumber: number,
    existingRounds: FibbageRound[]
  ): FibbageRound {
    const existingQuestions = new Set(
      existingRounds.map((round) => round.question)
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
      lastUpdatedAt: new Date().toISOString(),
      question: selectedQuestion.question,
      roundNumber,
      type: "fibbage"
    };
  }
}
