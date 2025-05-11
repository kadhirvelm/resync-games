import { Button, DisplayText, Flex } from "@/lib/radix";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  FishbowlSinglePlayerContributions,
  FishbowlWord
} from "../../../backend";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../store/fishbowlRedux";
import styles from "./PreviouslyContributedWord.module.scss";
import {
  selectFishbowlPlayer,
  selectPlayerContributions
} from "../store/selectors";

export const PreviouslyContributedWord = ({
  fishbowlWord
}: {
  fishbowlWord: FishbowlWord;
}) => {
  const dispatch = useFishbowlDispatch();

  const canEdit = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round === undefined
  );

  const player = useFishbowlSelector((s) => s.playerSlice.player);
  const fishbowlPlayer = useFishbowlSelector(selectFishbowlPlayer);
  const currentContributions = useFishbowlSelector(selectPlayerContributions);

  const deleteWord = () => {
    if (player === undefined || fishbowlPlayer === undefined) {
      return;
    }

    const newContributions: FishbowlSinglePlayerContributions = {
      lastUpdatedAt: new Date().toISOString(),
      player: fishbowlPlayer,
      words: (currentContributions?.words ?? []).filter(
        (w) => w.word !== fishbowlWord.word
      )
    };

    dispatch(
      updateFishbowlGameState(
        {
          playerWordContributions: {
            [player.playerId]: newContributions
          }
        },
        player
      )
    );
  };

  const renderDelete = () => {
    if (!canEdit) {
      return;
    }

    return (
      <Button onClick={deleteWord} variant="ghost">
        <Cross1Icon color="red" />
      </Button>
    );
  };

  return (
    <Flex align="center" gap="2">
      <Flex>{canEdit && renderDelete()}</Flex>
      <Flex className={styles.previousWord} px="3" py="1">
        <DisplayText>{fishbowlWord.word}</DisplayText>
      </Flex>
    </Flex>
  );
};
