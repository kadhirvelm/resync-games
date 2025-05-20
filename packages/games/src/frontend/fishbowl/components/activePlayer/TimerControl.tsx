import { PauseIcon, PlayIcon } from "lucide-react";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../store/fishbowlRedux";
import { Button, Flex } from "@/lib/radix";
import { FishbowlActiveTracker } from "../../../../backend";

export const TimerControl = () => {
  const dispatch = useFishbowlDispatch();

  const player = useFishbowlSelector((s) => s.playerSlice.player);
  const round = useFishbowlSelector((s) => s.gameStateSlice.gameState?.round);

  if (
    round === undefined ||
    round.currentActivePlayer.timer.state === "stopped" ||
    player === undefined
  ) {
    return;
  }

  const {
    currentActivePlayer,
    currentActivePlayer: { timer }
  } = round;

  const onStart = () => {
    const newTracker: FishbowlActiveTracker = {
      ...timer,
      lastUpdatedAt: new Date().toISOString(),
      startTime: new Date().valueOf(),
      state: "running"
    };

    dispatch(
      updateFishbowlGameState(
        {
          round: {
            ...round,
            currentActivePlayer: {
              ...currentActivePlayer,
              timer: newTracker
            }
          }
        },
        player
      )
    );
  };

  const onPause = () => {
    const newTracker: FishbowlActiveTracker = {
      ...timer,
      lastUpdatedAt: new Date().toISOString(),
      seedTime: new Date().valueOf() - timer.startTime + timer.seedTime,
      state: "paused"
    };

    dispatch(
      updateFishbowlGameState(
        {
          round: {
            ...round,
            currentActivePlayer: {
              ...currentActivePlayer,
              timer: newTracker
            }
          }
        },
        player
      )
    );
  };

  const playText = timer.seedTime !== 0 ? "Resume" : "Start";

  return (
    <Flex>
      <Button
        onClick={timer.state === "running" ? onPause : onStart}
        variant={timer.state === "running" ? "outline" : "solid"}
      >
        {timer.state === "running" ? (
          <PauseIcon size={16} />
        ) : (
          <>
            {playText} <PlayIcon size={16} />
          </>
        )}
      </Button>
    </Flex>
  );
};
