import { Flex } from "@/lib/radix";
import { DisplayContributionCount } from "./components/globalScreen/DisplayContributionCount";
import { useFishbowlSelector } from "./store/fishbowlRedux";
import { currentPhaseSelector } from "./store/sharedSelectors";

export const FishbowlGlobalScreen = () => {
  const currentPhase = useFishbowlSelector(currentPhaseSelector);
  if (currentPhase === "word-contribution") {
    return <DisplayContributionCount />;
  }

  return <Flex>Round in progress</Flex>;
};
