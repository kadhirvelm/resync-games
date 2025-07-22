import { currentFibbageRound } from "../../selectors/fibbageSelectors";
import { useTriviaSelector } from "../../store/triviaRedux";

export const PlayerFibbageRoundInProgress = () => {
  const curFibbageRound = useTriviaSelector(currentFibbageRound);
  if (!curFibbageRound) {
    return <div>No Fibbage round in progress!</div>;
  }

  // Note that the user will be able to see the question and the names of players we are waiting on
  // on the global screen. So we don't need to repeat that here.

  if (curFibbageRound.currentGameState == "waiting-for-answers") {
    // Have a text input for the current player to submit their answer.
  }

  if (curFibbageRound.currentGameState == "waiting-for-guesses") {
    // Display the answers and let the current player pick one of them as their guess.
  }
};
