import { lazy, useRef, useState } from "react";
import { Button, DisplayText, Flex, TextField } from "../../../../../lib/radix";
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
  selectExpectedWordContributionCount,
  selectFishbowlPlayer,
  selectPlayerContributions
} from "../selectors/playerSelectors";
import { PreviouslyContributedWord } from "./PreviouslyContributedWord";

const LazyWordIdea = lazy(() => import("./WordIdea"));

export const ContributeWords = () => {
  const dispatch = useFishbowlDispatch();

  const player = useFishbowlSelector((s) => s.playerSlice.player);
  const fishbowlPlayer = useFishbowlSelector(selectFishbowlPlayer);
  const currentContributions = useFishbowlSelector(selectPlayerContributions);
  const expectedWordContributionCount = useFishbowlSelector(
    selectExpectedWordContributionCount
  );

  const [newWordValue, setNewWordValue] = useState("");
  const textFieldRef = useRef<HTMLInputElement>(null);

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
      word: newWordValue.trim().toLowerCase()
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
    textFieldRef.current?.focus();
  };

  const currentContributionCount = currentContributions?.words?.length ?? 0;
  const finishedContributing =
    currentContributionCount >= expectedWordContributionCount;

  const renderWordContributorTextField = () => {
    if (finishedContributing) {
      return (
        <Flex justify="center">
          <DisplayText color="green" size="6">
            You're ready to go!
          </DisplayText>
        </Flex>
      );
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") {
        return;
      }

      contributeWord();
      e.preventDefault();
    };

    return (
      <Flex align="center" gap="2">
        <TextField
          autoCorrect="on"
          onChange={setNewWordValue}
          onKeyDown={onKeyDown}
          placeholder="Enter word..."
          ref={textFieldRef}
          size="3"
          spellCheck="true"
          style={{ width: "50vw" }}
          value={newWordValue}
        />
        <Flex flex="1">
          <Button
            disabled={newWordValue === "" || newWordIsDuplicate}
            onClick={contributeWord}
          >
            Submit ({currentContributionCount} / {expectedWordContributionCount}
            )
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex align="center" flex="1" gap="2" justify="center" m="2">
      <Flex direction="column" gap="2">
        {!finishedContributing && (
          <Flex>
            <LazyWordIdea />
          </Flex>
        )}
        {renderWordContributorTextField()}
        <Flex align="baseline" gap="2" mt="6" px="2" wrap="wrap">
          {currentContributions?.words.map((w, index) => (
            <PreviouslyContributedWord fishbowlWord={w} key={index} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
