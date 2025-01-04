import { cycleTime } from "@resync-games/games-shared/theStockTimes/cycleTime";
import { Button } from "../../../components";
import {
  updateTheStockTimesGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../../store/theStockTimesRedux";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";

export const PauseAndPlay = () => {
  const dispatch = useGameStateDispatch();

  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);
  const player = useGameStateSelector((s) => s.playerSlice.player);

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
      style={{ paddingBottom: "5px", paddingTop: "5px" }}
      variant={gameState.cycle.state === "paused" ? "solid" : "outline"}
    >
      {gameState.cycle.state === "paused" ? <PlayIcon /> : <PauseIcon />}
    </Button>
  );
};
