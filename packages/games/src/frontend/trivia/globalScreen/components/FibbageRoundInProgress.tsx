import { currentFibbageRound } from "../../selectors/fibbageSelectors";
import { useTriviaSelector } from "../../store/triviaRedux";

export const FibbageRoundInProgress = () => {
  const curFibbageRound = useTriviaSelector(currentFibbageRound);
  if (!curFibbageRound) {
    return <div>No Fibbage round in progress!</div>;
  }

  console.log("FibbageRoundInProgress", curFibbageRound);

  const question = curFibbageRound.question;
  if (curFibbageRound.currentGameState === "waiting-for-answers") {
    // Display the question and the names of players we are waiting on.
    const remainingPlayers = curFibbageRound.activePlayers.filter(
      (player) => player.answer === null
    );
    return (
      <div>
        <h2>{question}</h2>
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

  if (curFibbageRound.currentGameState === "waiting-for-guesses") {
    // Display the question, all possible answers, and the names of players we are waiting on.
    const remainingPlayers = curFibbageRound.activePlayers.filter(
      (player) => player.guess === null
    );
    return (
      <div>
        <h2>{question}</h2>
        <p>Possible answers:</p>
        <ul>
          {curFibbageRound.allAnswers.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
        </ul>
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
};
