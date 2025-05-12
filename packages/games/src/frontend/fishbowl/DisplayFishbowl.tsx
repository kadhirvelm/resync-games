import { Flex } from "@/lib/radix";
import { useFishbowlSelector } from "./store/fishbowlRedux";
import { ContributeWords } from "./components/ContributeWords";
import { currentPhaseSelector } from "./store/sharedSelectors";

export const DisplayFishbowl = () => {
  const phase = useFishbowlSelector(currentPhaseSelector);

  if (phase === "word-contribution") {
    return <ContributeWords />;
  }

  return <Flex>TODO</Flex>;
};
