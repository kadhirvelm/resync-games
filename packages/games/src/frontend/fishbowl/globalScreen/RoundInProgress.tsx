import { Flex } from "@/lib/radix";
import { CurrentGuesses } from "./components/CurrentGuesses";
import { GlobalActivePlayer } from "./components/GlobalActivePlayer";
import { WordCelebration } from "./components/WordCelebration";
import { useAdvancePlayer } from "./hooks/useAdvancePlayer";
import { useNextWord } from "./hooks/useNextWord";
import { NextRoundIdentifier } from "./components/NextRoundIdentifier";

export const RoundInProgress = () => {
  useAdvancePlayer();

  useNextWord();

  return (
    <Flex flex="1" gap="2">
      <WordCelebration />
      <NextRoundIdentifier />
      <GlobalActivePlayer />
      <CurrentGuesses />
    </Flex>
  );
};
