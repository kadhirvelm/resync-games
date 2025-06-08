import { Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { finalScoreSelector } from "../../store/sharedSelectors";

export const FinalScore = () => {
  const maybeFinalScores = useFishbowlSelector(finalScoreSelector);

  if (maybeFinalScores === undefined) {
    return <Flex>Final scores not available yet.</Flex>;
  }

  return <Flex>{JSON.stringify(maybeFinalScores, null, 2)}</Flex>;
};
