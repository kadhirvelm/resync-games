import { Flex } from "@/lib/radix";
import { useFishbowlSelector } from "./store/fishbowlRedux";
import { ContributeWords } from "./components/ContributeWords";

export const DisplayFishbowl = () => {
  const state = useFishbowlSelector((s) => s.gameStateSlice.gameState);
  if (state?.round === undefined) {
    return <ContributeWords />;
  }

  return <Flex>Hello world!</Flex>;
};
