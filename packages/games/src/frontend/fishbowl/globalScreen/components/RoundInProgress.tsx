import { Flex } from "@/lib/radix";
import { CurrentGuesses } from "./CurrentGuesses";
import { GlobalActivePlayer } from "./GlobalActivePlayer";
import { WordCelebration } from "./WordCelebration";
import { useAdvancePlayer } from "../hooks/useAdvancePlayer";
import { useNextWord } from "../hooks/useNextWord";
import { NextRoundIdentifier } from "./NextRoundIdentifier";
import { ViewWords } from "./ViewWords";

export const RoundInProgress = () => {
  useAdvancePlayer();
  useNextWord();

  const helpers = () => {
    return (
      <>
        <WordCelebration />
        <NextRoundIdentifier />
        <ViewWords />
      </>
    );
  };

  return (
    <Flex flex="1" gap="2">
      {helpers()}
      <GlobalActivePlayer />
      <CurrentGuesses />
    </Flex>
  );
};
