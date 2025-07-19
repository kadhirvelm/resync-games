import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import { selectActiveRound } from "../../selectors/playerSelectors";
import { FishbowlTimer } from "../../timer/FishbowlTimer";
import { ActiveWord } from "./ActiveWord";
import { DrawingMode } from "./DrawingMode";
import { SomeoneGotIt } from "./SomeoneGotIt";
import { TimerControl } from "./TimerControl";
import { useState } from "react";

export const ActivePlayer = () => {
  const timer = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActivePlayer.timer
  );
  const activeRound = useFishbowlSelector(selectActiveRound);

  const [drawingMode, setDrawingMode] = useState(false);

  if (timer === undefined || activeRound === undefined) {
    return;
  }

  const timeRemaining = Math.round(
    (timer.countdownTimer - timer.seedTime) / 1000
  );

  if (timer.state !== "running" && timer.seedTime !== 0) {
    return (
      <Flex align="center" flex="1" gap="2" justify="center">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <DisplayText color="green" size="7">
              Next round, {timeRemaining} seconds left
            </DisplayText>
          </Flex>
          <TimerControl />
          <SomeoneGotIt timer={timer} />
        </Flex>
      </Flex>
    );
  }

  if (timer.state !== "running") {
    return (
      <Flex align="center" flex="1" gap="2" justify="center">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <DisplayText size="7">
              Your turn, {timeRemaining} seconds
            </DisplayText>
          </Flex>
          <TimerControl />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      direction="column"
      flex="1"
      gap="4"
      justify="center"
      m="2"
    >
      <Flex direction="column" gap="4">
        <Flex align="center" gap="2">
          <ActiveWord />
          <FishbowlTimer timer={timer} />
        </Flex>
        <Flex align="center" gap="2">
          <SomeoneGotIt timer={timer} />
          <TimerControl />
        </Flex>
        <Flex flex={drawingMode ? "1" : "0"}>
          <DrawingMode
            drawingMode={drawingMode}
            setDrawingMode={setDrawingMode}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
