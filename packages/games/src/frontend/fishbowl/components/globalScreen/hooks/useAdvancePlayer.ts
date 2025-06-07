import { useEffect } from "react";
import { PlayerId } from "../../../../../../imports/api";
import { FishbowlGameConfiguration } from "../../../../../backend";
import { useTimer } from "../../../hooks/useTimer";
import { advanceToNextPlayer } from "../../../stateFunctions/advanceToNextPlayer";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../../store/fishbowlRedux";

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

  const onAdvanceToNextPlayer = () => {
    if (
      activeRound === undefined ||
      turnOrder === undefined ||
      allPlayers === undefined ||
      gameConfiguration === undefined
    ) {
      return;
    }

    const newFishbowlRound = advanceToNextPlayer(
      activeRound,
      turnOrder,
      allPlayers,
      gameConfiguration
    );

    dispatch(
      updateFishbowlGameState(
        {
          round: newFishbowlRound
        },
        {
          avatarCollection: "thumbs",
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

    onAdvanceToNextPlayer();
  }, [timer]);
}
