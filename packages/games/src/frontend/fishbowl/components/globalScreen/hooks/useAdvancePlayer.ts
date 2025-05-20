import { useEffect } from "react";
import { useTimer } from "../../../hooks/useTimer";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../../store/fishbowlRedux";
import {
  FishbowlActivePlayer,
  FishbowlActiveTracker,
  FishbowlGameConfiguration,
  FishbowlRound
} from "../../../../../backend";
import { cloneDeep } from "lodash-es";
import { PlayerId } from "../../../../../../imports/api";

export function useAdvancePlayer() {
  const dispatch = useFishbowlDispatch();

  const activeRound = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round
  );
  const turnOrder = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.turnOrder
  );
  const allPlayers = useFishbowlSelector(
    (s) => s.gameStateSlice.gameInfo?.players
  );
  const gameConfiguration = useFishbowlSelector(
    (s) =>
      s.gameStateSlice.gameInfo?.gameConfiguration as
        | FishbowlGameConfiguration
        | undefined
  );

  const timer = useTimer(activeRound?.currentActivePlayer.timer);

  const advanceToNextPlayer = () => {
    if (
      activeRound === undefined ||
      turnOrder === undefined ||
      allPlayers === undefined ||
      gameConfiguration === undefined
    ) {
      return;
    }

    const newFishbowlRound: FishbowlRound = cloneDeep(activeRound);
    newFishbowlRound.lastUpdatedAt = new Date().toISOString();

    const currentPlayerIndex = turnOrder.findIndex(
      (order) => order === activeRound.currentActivePlayer.player.playerId
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % turnOrder.length;
    const nextPlayer = allPlayers.find(
      (player) => player.playerId === turnOrder[nextPlayerIndex]
    );
    if (nextPlayer === undefined) {
      // Something went wrong here, we should error out
      return;
    }

    const fishbowlActiveTracker: FishbowlActiveTracker = {
      countdownTimer: (gameConfiguration.timePerPlayer[1] ?? 0) * 1000,
      lastUpdatedAt: new Date().toISOString(),
      seedTime: 0,
      startTime: 0,
      state: "paused"
    };

    const nextActivePlayer: FishbowlActivePlayer = {
      lastUpdatedAt: new Date().toISOString(),
      player: nextPlayer,
      timer: fishbowlActiveTracker
    };
    newFishbowlRound.currentActivePlayer = nextActivePlayer;

    dispatch(
      updateFishbowlGameState(
        {
          round: newFishbowlRound
        },
        {
          displayName: "Fishbowl global screen",
          playerId: "GLOBAL_SCREEN" as PlayerId
        }
      )
    );
  };

  useEffect(() => {
    if (
      activeRound === undefined ||
      activeRound.currentActivePlayer.timer.state !== "running" ||
      timer.timeFraction < 1
    ) {
      return;
    }

    advanceToNextPlayer();
  }, [timer]);
}
