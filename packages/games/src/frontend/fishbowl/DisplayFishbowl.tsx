import { Flex } from "@/lib/radix";
import { useFishbowlSelector } from "./store/fishbowlRedux";
import { ContributeWords } from "./components/ContributeWords";
import { currentPhaseSelector } from "./store/sharedSelectors";
import { ActivePlayer } from "./components/activePlayer/ActivePlayer";

export const DisplayFishbowl = () => {
  const phase = useFishbowlSelector(currentPhaseSelector);

  if (phase === "word-contribution") {
    return <ContributeWords />;
  }

  if (phase === "active-player") {
    return <ActivePlayer />;
  }

  return (
    <Flex align="center" flex="1" justify="center">
      Guessing
    </Flex>
  );
};
