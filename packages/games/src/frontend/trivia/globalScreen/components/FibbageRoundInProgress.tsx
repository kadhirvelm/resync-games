import { PlayerId } from "@/imports/api";
import { currentScores } from "../../selectors/commonSelectors";
import { currentFibbageRound } from "../../selectors/fibbageSelectors";
import { useTriviaSelector } from "../../store/triviaRedux";

export const FibbageRoundInProgress = () => {
  const curFibbageRound = useTriviaSelector(currentFibbageRound);
  const curScores = useTriviaSelector(currentScores);
  if (!curFibbageRound) {
    return <div>No Fibbage round in progress!</div>;
  }
  if (curScores === undefined) {
    return <div>No scores available!</div>;
  }

  const question = curFibbageRound.question;
  if (curFibbageRound.state === "waiting-for-answers") {
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

  if (curFibbageRound.state === "waiting-for-guesses") {
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

  if (curFibbageRound.state === "finished") {
    const {
      roundNumber,
      correctAnswer,
      activePlayers: players
    } = curFibbageRound;

    // who guessed correctly?
    const correctGuessers = players.filter((p) => p.guess === correctAnswer);

    // for each fake‐answer author, who fell for it?
    const fooledStats = players
      .filter((p) => p.answer !== null && p.answer !== correctAnswer)
      .map((author) => {
        const fooled = players.filter((p) => p.guess === author.answer);
        return { author, fooled };
      })
      .filter((stat) => stat.fooled.length > 0);

    return (
      <div className="p-4">
        <h2>{question}</h2>
        <p>Round {roundNumber} Results</p>

        <h3>Correct Answer: “{correctAnswer}”</h3>
        {correctGuessers.length > 0 ? (
          <>
            <h4>Correct Guesses (+100 each):</h4>
            <ul>
              {correctGuessers.map((p) => (
                <li key={p.playerId}>{p.name} (+100)</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No one guessed correctly.</p>
        )}

        {fooledStats.length > 0 && (
          <>
            <h4>Fooled Players (+50 per fool):</h4>
            <ul>
              {fooledStats.map(({ author, fooled }) => (
                <li key={author.playerId}>
                  {author.name} answered “{author.answer}” and fooled{" "}
                  {fooled.length} {fooled.length > 1 ? "players" : "player"} (
                  {fooled.map((f) => f.name).join(", ")}) +{fooled.length * 50}
                </li>
              ))}
            </ul>
          </>
        )}

        <h4>Scores So Far:</h4>
        <ul>
          {players.map((p) => (
            <li key={p.playerId}>
              {p.name}: {curScores[p.playerId as PlayerId] ?? 0}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <div>Unknown Fibbage round state: {curFibbageRound.state}</div>;
};
