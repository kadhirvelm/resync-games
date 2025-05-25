import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { selectActiveRound } from "../../store/selectors";
import { FishbowlTimer } from "../timer/FishbowlTimer";
import { ActiveWord } from "./ActiveWord";
import { SomeoneGotIt } from "./SomeoneGotIt";
import { TimerControl } from "./TimerControl";

export const ActivePlayer = () => {
  const timer = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer
  );
  const activeRound = useFishbowlSelector(selectActiveRound);

  if (timer === undefined || activeRound === undefined) {
    return;
  }

  if (timer.state !== "running") {
    return (
      <Flex align="center" flex="1" gap="2" justify="center">
        <Flex direction="column" gap="2">
          <DisplayText size="7">It's your turn!</DisplayText>
          <TimerControl />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex align="center" direction="column" flex="1" gap="4" justify="center">
      <Flex direction="column" gap="4">
        <Flex align="center" gap="2">
          <ActiveWord />
          <FishbowlTimer timer={timer} />
        </Flex>
        <Flex align="center" gap="2">
          <SomeoneGotIt />
          <TimerControl />
        </Flex>
      </Flex>
    </Flex>
  );
};
