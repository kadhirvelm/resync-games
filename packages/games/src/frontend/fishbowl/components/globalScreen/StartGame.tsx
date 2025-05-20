import { PlayerId } from "@resync-games/api";
import { Button, DisplayText } from "../../../../../lib/radix";
import {
  FishbowlGameConfiguration,
  FishbowlActiveTracker,
  FishbowlActivePlayer,
  FishbowlRound,
  FishbowlWord,
  FishbowlSinglePlayerContributions
} from "../../../../backend";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../store/fishbowlRedux";

export const StartGame = () => {
  const dispatch = useFishbowlDispatch();

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

  const onStartGame = () => {
    if (
      gameState === undefined ||
      allPlayers === undefined ||
      gameConfiguration === undefined
    ) {
      return;
    }

    const activePlayer = allPlayers.find(
      (p) => p.playerId === gameState.turnOrder[0]
    );
    if (activePlayer === undefined) {
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

    const firstPlayer: FishbowlActivePlayer = {
      lastUpdatedAt: new Date().toISOString(),
      player: activePlayer,
      timer: fishbowlActiveTracker
    };

    const gameWords = Object.values(gameState.playerWordContributions).reduce(
      (acc: FishbowlWord[], current: FishbowlSinglePlayerContributions) =>
        acc.concat(current.words),
      []
    );

    const remainingWords = gameWords.slice();
    const currentActiveWord = remainingWords.pop();

    const firstFishbowlRound: FishbowlRound = {
      correctGuesses: [],
      currentActivePlayer: firstPlayer,
      currentActiveWord,
      lastUpdatedAt: new Date().toISOString(),
      remainingWords,
      roundNumber: 1
    };

    dispatch(
      updateFishbowlGameState(
        {
          gameWords,
          round: firstFishbowlRound
        },
        {
          displayName: "Fishbowl global screen",
          playerId: "GLOBAL_SCREEN" as PlayerId
        }
      )
    );
  };

  return (
    <Button onClick={onStartGame} size="4">
      <DisplayText size="5">Start game!</DisplayText>
    </Button>
  );
};
