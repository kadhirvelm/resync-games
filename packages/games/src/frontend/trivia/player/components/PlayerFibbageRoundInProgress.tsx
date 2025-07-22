import { currentPlayer } from "../../selectors/commonSelectors";
import { currentFibbageRound } from "../../selectors/fibbageSelectors";
import {
  updateTriviaGameState,
  useTriviaDispatch,
  useTriviaSelector
} from "../../store/triviaRedux";
import React, { useState, FormEvent } from "react";

interface AnswerProps {
  onSubmit: (answer: string) => void;
}

const FibbageAnswerInput: React.FC<AnswerProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = answer.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-2" htmlFor="fibbage-answer">
        Your fake answer:
      </label>
      <input
        className="border p-2 rounded w-full mb-4"
        id="fibbage-answer"
        onChange={(e) => setAnswer(e.target.value)}
        type="text"
        value={answer}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="submit"
      >
        Submit Answer
      </button>
    </form>
  );
};

interface GuessProps {
  onGuess: (optionIdx: string) => void;
  options: string[];
}

const FibbageGuessInput: React.FC<GuessProps> = ({ options, onGuess }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selected) {
      onGuess(selected);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="block mb-2">Pick which answer is real:</legend>
        {options.map((opt, idx) => (
          <div className="mb-2" key={idx.toString()}>
            <label className="inline-flex items-center">
              <input
                checked={selected === idx.toString()}
                className="mr-2"
                name="fibbage-guess"
                onChange={() => setSelected(idx.toString())}
                type="radio"
                value={idx.toString()}
              />
              {opt}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        disabled={!selected}
        type="submit"
      >
        Submit Guess
      </button>
    </form>
  );
};

export const PlayerFibbageRoundInProgress: React.FC = () => {
  const round = useTriviaSelector(currentFibbageRound);
  const curPlayer = useTriviaSelector(currentPlayer);
  const dispatch = useTriviaDispatch();
  if (!round) {
    return <div>No Fibbage round in progress!</div>;
  }

  if (!curPlayer) {
    return <div>No player information available!</div>;
  }

  const { roundNumber, state, allAnswers, answers, guesses, activePlayers } =
    round;
  const { playerId } = curPlayer;

  // Note that the user will be able to see the question and the names of players we are waiting on
  // on the global screen. So we don't need to repeat that here.

  const handleAnswerSubmit = (answer: string) => {
    // TODO: dispatch your “submit answer” action here
    console.log("submit fake answer:", answer);
    dispatch(
      updateTriviaGameState(
        {
          rounds: {
            [roundNumber]: {
              answers: {
                [playerId]: answer
              }
            }
          }
        },
        curPlayer
      )
    );
  };

  const handleGuessSubmit = (options: string[]) => {
    return (optionIdx: string) => {
      const guess = options[parseInt(optionIdx, 10)];
      console.log("submit guess:", guess);
      dispatch(
        updateTriviaGameState(
          {
            rounds: {
              [roundNumber]: {
                guesses: {
                  [playerId]: guess
                }
              }
            }
          },
          curPlayer
        )
      );
    };
  };

  if (state === "waiting-for-answers") {
    // If the current player hasn't answered, present a text input for the current player to submit their answer.
    // Otherwise, display the set of players you are waiting on.
    if (answers[playerId] === undefined) {
      // Current player hasn't answered yet
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Your Answer</h2>
          <FibbageAnswerInput onSubmit={handleAnswerSubmit} />
        </div>
      );
    } else {
      const remainingPlayers = activePlayers.filter(
        (player) => player.answer === null
      );
      if (remainingPlayers.length === 0) {
        return <div>All players have submitted their answers!</div>;
      }
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Waiting for Answers</h2>
          <p>
            Waiting for {remainingPlayers.length} player
            {remainingPlayers.length > 1 ? "s" : ""} to submit their answers.
          </p>
          <ul>
            {remainingPlayers.map((player) => (
              <li key={player.playerId}>{player.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  if (state === "waiting-for-guesses") {
    // If the current player hasn't guessed, let the current player pick one of the answers as their guess.
    // Otherwise, display the set of players you are waiting on.
    if (guesses[playerId] === undefined) {
      // Current player hasn't guessed yet.
      // Show options other than their own answer.
      const options = allAnswers.filter(
        (answer) => answer !== answers[playerId]
      );
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Your Guess</h2>
          <FibbageGuessInput
            onGuess={handleGuessSubmit(options)}
            options={allAnswers}
          />
        </div>
      );
    } else {
      const remainingPlayers = activePlayers.filter(
        (player) => player.guess === null
      );
      if (remainingPlayers.length === 0) {
        return <div>All players have made their guesses!</div>;
      }
      // Display the set of players we are waiting on.
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Waiting for Guesses</h2>
          <p>
            Waiting for {remainingPlayers.length} player
            {remainingPlayers.length > 1 ? "s" : ""} to make their guesses.
          </p>
          <ul>
            {remainingPlayers.map((player) => (
              <li key={player.playerId}>{player.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  if (state === "finished") {
    // The main results will be on the global screen. So we just say the round is finished.
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Round Finished!</h2>
      </div>
    );
  }

  return null;
};
