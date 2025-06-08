import { Flex } from "@/lib/radix";
import { CurrentGuesses } from "./CurrentGuesses";
import { GlobalActivePlayer } from "./GlobalActivePlayer";
import { WordCelebration } from "./WordCelebration";
import { useAdvancePlayer } from "../hooks/useAdvancePlayer";
import { useNextWord } from "../hooks/useNextWord";
import { NextRoundIdentifier } from "./NextRoundIdentifier";

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
