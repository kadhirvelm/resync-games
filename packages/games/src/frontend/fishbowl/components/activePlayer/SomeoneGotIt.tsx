import { SlideConfirm } from "@/lib/radix";
import { FishbowlGameConfiguration } from "../../../../backend";
import { advanceWord } from "../../stateFunctions/advanceWord";
import { newRound } from "../../stateFunctions/newRound";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../store/fishbowlRedux";
import { selectActiveRound, selectFishbowlPlayer } from "../../store/selectors";

export const SomeoneGotIt = () => {
  const dispatch = useFishbowlDispatch();

  const activePlayer = useFishbowlSelector(selectFishbowlPlayer);
  const activeRound = useFishbowlSelector(selectActiveRound);

  const gameState = useFishbowlSelector((s) => s.gameStateSlice.gameState);
  const allPlayers = useFishbowlSelector(
    (s) => s.gameStateSlice.gameInfo?.players
  );
  const gameConfiguration = useFishbowlSelector(
    (s) =>
      s.gameStateSlice.gameInfo?.gameConfiguration as
        | FishbowlGameConfiguration
        | undefined
  );

  if (
    activePlayer === undefined ||
    activeRound === undefined ||
    gameState === undefined ||
    allPlayers === undefined ||
    gameConfiguration === undefined
  ) {
    return;
  }

  const onAdvanceWord = () => {
    const updatedRound = advanceWord(activeRound, activePlayer);
    if (updatedRound.currentActiveWord !== undefined) {
      dispatch(
        updateFishbowlGameState(
          {
            round: updatedRound
          },
          activePlayer
        )
      );

      return;
    }

    const newHistory = [...gameState.pastRounds, updatedRound];
    const { round } = newRound(gameState, allPlayers, gameConfiguration);

    dispatch(
      updateFishbowlGameState(
        {
          lastUpdatedAt: new Date().toISOString(),
          pastRounds: newHistory,
          round
        },
        activePlayer
      )
    );
  };

  return (
    <SlideConfirm confirmText="Someone got it" onConfirm={onAdvanceWord} />
  );
};
