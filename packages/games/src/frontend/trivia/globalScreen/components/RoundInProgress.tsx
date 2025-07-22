import { Flex } from "@/lib/radix";
import { useTriviaSelector } from "../../store/triviaRedux";
import { currentTriviaRound } from "../../selectors/commonSelectors";
import { FibbageRoundInProgress } from "./FibbageRoundInProgress";

export const RoundInProgress = () => {
  const currentRound = useTriviaSelector(currentTriviaRound);

  if (!currentRound) {
    return <div>No round in progress!</div>;
  }

  if (currentRound.type === "fibbage") {
    return <FibbageRoundInProgress />;
  }

  // Not implemented for other round types yet.
  return (
    // Placeholder for other round types (e.g., "trivia", "multiple-choice" etc.
    // You can create similar components for those types as needed.
    <Flex align="center" direction="column" flex="1" justify="center">
      <h2>Round {currentRound.roundNumber}</h2>
      {/* Additional round details can be added here */}
    </Flex>
  );
};
