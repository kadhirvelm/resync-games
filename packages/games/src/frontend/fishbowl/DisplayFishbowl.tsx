import { Flex } from "@/lib/radix";
import { useFishbowlSelector } from "./store/fishbowlRedux";
import { ContributeWords } from "./playerComponents/components/ContributeWords";
import { currentPhaseSelector } from "./store/sharedSelectors";
import { ActivePlayer } from "./playerComponents/components/activePlayer/ActivePlayer";
import { GuessingPlayer } from "./playerComponents/components/guessingPlayer/GuessingPlayer";
import { PlayerFinalScore } from "./playerComponents/components/PlayerFinalScore";

export const DisplayFishbowl = () => {
  const phase = useFishbowlSelector(currentPhaseSelector);

  if (phase === "waiting") {
    return;
  }

  if (phase === "finished") {
    return <PlayerFinalScore />;
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
