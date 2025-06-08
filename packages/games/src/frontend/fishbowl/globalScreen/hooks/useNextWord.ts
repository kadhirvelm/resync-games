import { useEffect } from "react";
import { useAdvanceWord } from "../../stateFunctions/advanceWord";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { selectGuessesByTeam } from "../selectors/globalScreenSelectors";

export function useNextWord() {
  const guessesByTeam = useFishbowlSelector(selectGuessesByTeam);
  const maybeAdvanceWord = useAdvanceWord();

  const checkIfGuessIsRight = () => {
    if (
      guessesByTeam === undefined ||
      guessesByTeam.correctGuess === undefined
    ) {
      return;
    }

    const activeTeamGuesses =
      guessesByTeam.guessesByTeam[guessesByTeam.currentActiveTeam] ?? [];
    const correctGuess = activeTeamGuesses.find(
      (guess) => guess.guess === guessesByTeam.correctGuess
    );

    if (correctGuess === undefined) {
      return;
    }

    maybeAdvanceWord?.(correctGuess.guessingPlayer);
  };

  useEffect(() => {
    checkIfGuessIsRight();
  }, [guessesByTeam]);
}
