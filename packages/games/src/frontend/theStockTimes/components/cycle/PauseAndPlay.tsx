import { cycleTime } from "@/imports/games-shared";
import { Button } from "@/lib/radix";
import {
  updateTheStockTimesGameState,
  useStockTimesGameStateDispatch,
  useStockTimesSelector
} from "../../store/theStockTimesRedux";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";

export const PauseAndPlay = () => {
  const dispatch = useStockTimesGameStateDispatch();

  const gameState = useStockTimesSelector((s) => s.gameStateSlice.gameState);
  const player = useStockTimesSelector((s) => s.playerSlice.player);

  if (gameState?.cycle === undefined || player === undefined) {
    return;
  }

  const togglePause = () => {
    const newState = gameState.cycle.state === "paused" ? "playing" : "paused";
    const { currentTime } = cycleTime(gameState.cycle);

    dispatch(
      updateTheStockTimesGameState(
        {
          cycle: {
            ...gameState.cycle,
            lastUpdatedAt: new Date().toISOString(),
            seedTime:
              newState === "paused" ? currentTime : gameState.cycle.seedTime,
            startTime:
              newState === "playing"
                ? new Date().toISOString()
                : gameState.cycle.startTime,
            state: newState
          }
        },
        player
      )
    );
  };

  return (
    <Button
      onClick={togglePause}
      variant={gameState.cycle.state === "paused" ? "solid" : "outline"}
    >
      {gameState.cycle.state === "paused" ? <PlayIcon /> : <PauseIcon />}
    </Button>
  );
};
