import { Flex } from "@/lib/radix";
import { useTriviaSelector } from "../../store/triviaRedux";
import {
  currentFibbageQuestion,
  currentFibbagePlayerGuesses,
  currentNumPlayers,
  currentFibbageSubmittedAnswers,
  currentFibbageCorrectAnswer
} from "../selectors/fibbageSelectors";

export const RoundInProgress = () => {
  const currentQuestion = useTriviaSelector(currentFibbageQuestion);
  const currentAnswers = useTriviaSelector(currentFibbagePlayerGuesses);
  const numPlayers = useTriviaSelector(currentNumPlayers);
  const submittedAnswers = useTriviaSelector(currentFibbageSubmittedAnswers);
  const correctAnswer = useTriviaSelector(currentFibbageCorrectAnswer);

  // If number of current answers < number of players, it means not all players have submitted their answers yet.
  if (Object.keys(currentAnswers).length < numPlayers) {
    // Display the current question and the number of players we are waiting on.
    return (
      <Flex flex="1" gap="2">
        <Flex>
          <h2>{currentQuestion}</h2>
        </Flex>
        <Flex>
          <p>
            Waiting for {numPlayers - Object.keys(currentAnswers).length}{" "}
            players to submit their answers.
          </p>
        </Flex>
      </Flex>
    );
  }
  // If number of guesses is less than number of players, it means not all players have made their guesses yet.
  if (Object.keys(submittedAnswers).length < numPlayers) {
    // Display the current question, all the possible answers (submitted + correct), and the number of players we are waiting on.
    const allAnswers: string[] = [
      ...Object.values(submittedAnswers),
      correctAnswer ? correctAnswer : ""
    ].filter((answer) => answer.trim() !== "");
    // Sort so it's always in the same order.
    allAnswers.sort((a, b) => a.localeCompare(b));
    return (
      <Flex flex="1" gap="2">
        <Flex>
          <h2>{currentQuestion}</h2>
        </Flex>
        <Flex direction="column" gap="1">
          {allAnswers.map((answer, index) => (
            <div key={index}>{answer}</div>
          ))}
        </Flex>
        <Flex>
          <p>
            Waiting for {numPlayers - Object.keys(submittedAnswers).length}{" "}
            players to make their guesses.
          </p>
        </Flex>
      </Flex>
    );
  }
};
