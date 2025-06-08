import { DisplayText, Flex } from "../../../lib/radix";
import { DisplayContributionCount } from "./globalScreen/components/DisplayContributionCount";
import { FinalScore } from "./globalScreen/components/FinalScore";
import { RoundInProgress } from "./globalScreen/components/RoundInProgress";
import { useFishbowlSelector } from "./store/fishbowlRedux";
import { currentPhaseSelector } from "./store/sharedSelectors";

export const FishbowlGlobalScreen = () => {
  const gameInfo = useFishbowlSelector((s) => s.gameStateSlice.gameInfo);
  const currentPhase = useFishbowlSelector(currentPhaseSelector);

  if (currentPhase === "word-contribution") {
    return <DisplayContributionCount />;
  }

  if (currentPhase === "waiting") {
    return (
      <Flex align="center" direction="column" flex="1" justify="center">
        <Flex>
          <DisplayText color="gray">Waiting for the game to start</DisplayText>
        </Flex>
        <Flex align="center" gap="2">
          <DisplayText size="9" weight="bold">
            {gameInfo?.inviteCode.toUpperCase()}
          </DisplayText>
        </Flex>
      </Flex>
    );
  }

  if (currentPhase === "finished") {
    return <FinalScore />;
  }

  return <RoundInProgress />;
};
