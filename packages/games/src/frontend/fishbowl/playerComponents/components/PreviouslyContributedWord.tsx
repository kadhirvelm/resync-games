import { DisplayText, Flex } from "@/lib/radix";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  FishbowlSinglePlayerContributions,
  FishbowlWord
} from "../../../../backend";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../../store/fishbowlRedux";
import {
  selectFishbowlPlayer,
  selectPlayerContributions
} from "../selectors/selectors";
import styles from "./PreviouslyContributedWord.module.scss";

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

    return <CrossCircledIcon color="red" onClick={deleteWord} />;
  };

  return (
    <Flex align="center" className={styles.previousWord} gap="2" px="3" py="1">
      <DisplayText className={styles.word}>{fishbowlWord.word}</DisplayText>
      <Flex>{canEdit && renderDelete()}</Flex>
    </Flex>
  );
};
