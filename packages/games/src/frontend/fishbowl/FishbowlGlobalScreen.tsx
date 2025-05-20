import { DisplayContributionCount } from "./components/globalScreen/DisplayContributionCount";
import { RoundInProgress } from "./components/globalScreen/RoundInProgress";
import { useFishbowlSelector } from "./store/fishbowlRedux";
import { currentPhaseSelector } from "./store/sharedSelectors";

export const FishbowlGlobalScreen = () => {
  const currentPhase = useFishbowlSelector(currentPhaseSelector);
  if (currentPhase === "word-contribution") {
    return <DisplayContributionCount />;
  }

  return <RoundInProgress />;
};
