import { Flex } from "@/lib/radix";
import { useFishbowlSelector } from "./store/fishbowlRedux";
import { ContributeWords } from "./playerComponents/ContributeWords";
import { currentPhaseSelector } from "./store/sharedSelectors";
import { ActivePlayer } from "./playerComponents/activePlayer/ActivePlayer";
import { GuessingPlayer } from "./playerComponents/guessingPlayer/GuessingPlayer";

export const DisplayFishbowl = () => {
  const phase = useFishbowlSelector(currentPhaseSelector);

  if (phase === "waiting") {
    return;
  }

  if (phase === "finished") {
    return (
      <Flex align="center" flex="1" justify="center">
        Done!
      </Flex>
    );
  }

  if (phase === "word-contribution") {
    return <ContributeWords />;
  }

  if (phase === "active-player") {
    return <ActivePlayer />;
  }

  return (
    <Flex align="center" flex="1" justify="center">
      <GuessingPlayer />
    </Flex>
  );
};
