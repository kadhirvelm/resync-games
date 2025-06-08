import { PlayerId } from "@resync-games/api";
import { Button, DisplayText } from "../../../../lib/radix";
import { FishbowlGameConfiguration } from "../../../backend";
import { newRound } from "../stateFunctions/newRound";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../store/fishbowlRedux";

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

    const { round, gameWords } = newRound(
      gameState,
      allPlayers,
      gameConfiguration
    );

    dispatch(
      updateFishbowlGameState(
        {
          gameWords,
          round
        },
        {
          avatarCollection: "thumbs",
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
