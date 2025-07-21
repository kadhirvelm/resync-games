import { DisplayText, Flex } from "@/lib/radix";
import { useTriviaSelector } from "./store/triviaRedux";
import { RoundInProgress } from "./globalScreen/components/RoundInProgress";

export const TriviaGlobalScreen = () => {
  const gameInfo = useTriviaSelector((s) => s.gameStateSlice.gameInfo);
  const currentPhase = gameInfo?.currentGameState;

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

  if (currentPhase == "playing") {
    return <RoundInProgress />;
  }
};
