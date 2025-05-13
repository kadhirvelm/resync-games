import { Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { selectActiveRound } from "../../store/selectors";
import { FishbowlTimer } from "../timer/FishbowlTimer";
import { TimerControl } from "./TimerControl";

export const ActivePlayer = () => {
  const timer = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer
  );
  const activeRound = useFishbowlSelector(selectActiveRound);

  if (timer === undefined || activeRound === undefined) {
    return;
  }

  return (
    <Flex align="center" flex="1" gap="2" justify="center">
      <FishbowlTimer timer={timer} />
      <TimerControl />
    </Flex>
  );
};
