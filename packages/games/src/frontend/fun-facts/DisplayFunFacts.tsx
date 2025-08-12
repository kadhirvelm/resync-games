import { SubmitFacts } from "./components/SubmitFacts";
import { ViewFacts } from "./components/ViewFacts";
import { useFunFactsSelector } from "./store/funFactsRedux";
import { currentPhaseSelector } from "./store/funFactsSelectors";

export const DisplayFunFacts = () => {
  const phase = useFunFactsSelector(currentPhaseSelector);

  if (phase === "collecting-facts") {
    return <SubmitFacts />;
  }

  if (phase === "viewing-facts") {
    return <ViewFacts />;
  }

  return null;
};
