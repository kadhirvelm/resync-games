import { Flex } from "@/lib/radix";
import { CurrentGuesses } from "./CurrentGuesses";
import { GlobalActivePlayer } from "./GlobalActivePlayer";
import { WordCelebration } from "./WordCelebration";
import { useAdvancePlayer } from "../hooks/useAdvancePlayer";
import { useNextWord } from "../hooks/useNextWord";
import { NextRoundIdentifier } from "./NextRoundIdentifier";
import { ViewWords } from "./ViewWords";
import { DisplayDrawing } from "./DisplayDrawing";

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
    <Flex flex="1">
      {helpers()}
      <Flex direction="column" flex="1" p="2">
        <Flex flex="1">
          <GlobalActivePlayer />
        </Flex>
        <Flex flex="2">
          <DisplayDrawing />
        </Flex>
      </Flex>
      <CurrentGuesses />
    </Flex>
  );
};
