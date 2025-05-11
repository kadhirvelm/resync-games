import { Button, DisplayText, Flex } from "../../../../../lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { selectCurrentWordContribution } from "../../store/globalScreenSelectors";
import { DisplayPlayer } from "@/components/player/DisplayPlayer";
import styles from "./DisplayContributonCount.module.scss";

export const DisplayContributionCount = () => {
  const wordCount = useFishbowlSelector(selectCurrentWordContribution);

  if (wordCount === undefined) {
    return;
  }

  const { currentWordCount, expectedWordCount, waitingOnPlayers } = wordCount;

  const maybeRenderWaitingOnPlayers = () => {
    if (waitingOnPlayers.length === 0) {
      return (
        <Flex>
          <Button size="4">
            <DisplayText size="5">Start game!</DisplayText>
          </Button>
        </Flex>
      );
    }

    return (
      <>
        <DisplayText size="7" weight="bold">
          {currentWordCount} / {expectedWordCount} words
        </DisplayText>
        <Flex gap="2" wrap="wrap">
          {waitingOnPlayers.map((player) => {
            return (
              <Flex
                align="center"
                className={styles.displayPlayer}
                gap="2"
                key={player.playerId}
                p="2"
              >
                <DisplayPlayer player={player} />
              </Flex>
            );
          })}
        </Flex>
      </>
    );
  };

  return (
    <Flex align="center" direction="column" flex="1" gap="4" justify="center">
      {maybeRenderWaitingOnPlayers()}
    </Flex>
  );
};
