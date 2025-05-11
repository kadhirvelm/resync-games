import { lazy, useState } from "react";
import { Button, Flex, TextField } from "../../../../lib/radix";
import {
  FishbowlSinglePlayerContributions,
  FishbowlWord
} from "../../../backend";
import {
  updateFishbowlGameState,
  useFishbowlDispatch,
  useFishbowlSelector
} from "../store/fishbowlRedux";
import {
  selectFishbowlPlayer,
  selectPlayerContributions
} from "../store/selectors";
import { PreviouslyContributedWord } from "./PreviouslyContributedWord";

const LazyWordIdea = lazy(() => import("./WordIdea"));

export const ContributeWords = () => {
  const dispatch = useFishbowlDispatch();

  const player = useFishbowlSelector((s) => s.playerSlice.player);
  const fishbowlPlayer = useFishbowlSelector(selectFishbowlPlayer);
  const currentContributions = useFishbowlSelector(selectPlayerContributions);

  const [newWordValue, setNewWordValue] = useState("");

  const newWordIsDuplicate =
    currentContributions?.words.find(
      (w) => w.word === newWordValue.toLowerCase()
    ) !== undefined;

  const contributeWord = () => {
    if (
      player === undefined ||
      fishbowlPlayer === undefined ||
      newWordValue === ""
    ) {
      return;
    }

    const newWord: FishbowlWord = {
      contributedBy: fishbowlPlayer,
      word: newWordValue.toLowerCase()
    };

    const newContributions: FishbowlSinglePlayerContributions = {
      lastUpdatedAt: new Date().toISOString(),
      player: fishbowlPlayer,
      words: [...(currentContributions?.words ?? []), newWord]
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

    setNewWordValue("");
  };

  return (
    <Flex align="center" flex="1" justify="center">
      <Flex direction="column" gap="2">
        <Flex align="center" gap="2">
          <TextField
            onChange={setNewWordValue}
            placeholder="Enter word..."
            size="3"
            style={{ width: "40vw" }}
            value={newWordValue}
          />
          <Flex>
            <Button
              disabled={newWordValue === "" || newWordIsDuplicate}
              onClick={contributeWord}
              style={{ width: "20vw" }}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
        <Flex align="center" gap="2">
          <LazyWordIdea />
        </Flex>
      </Flex>
      <Flex align="baseline" gap="2">
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            {currentContributions?.words.map((w, index) => (
              <PreviouslyContributedWord fishbowlWord={w} key={index} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
