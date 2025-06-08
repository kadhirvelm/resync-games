import { Button, Flex } from "@/lib/radix";
import { PauseIcon, PlayIcon } from "lucide-react";
import { paused, running } from "../../../stateFunctions/timerControl";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../../store/fishbowlRedux";

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
    dispatch(
      updateFishbowlGameState(
        {
          round: {
            ...round,
            currentActivePlayer: {
              ...currentActivePlayer,
              timer: running(timer)
            }
          }
        },
        player
      )
    );
  };

  const onPause = () => {
    dispatch(
      updateFishbowlGameState(
        {
          round: {
            ...round,
            currentActivePlayer: {
              ...currentActivePlayer,
              timer: paused(timer)
            }
          }
        },
        player
      )
    );
  };

  const playText = timer.seedTime !== 0 ? "Resume" : "Start your turn";

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
