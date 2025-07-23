import { DisplayText, Flex } from "@/lib/radix";
import { selectAllPlayerContributions } from "../../selectors/playerSelectors";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import styles from "./PlayerContribution.module.scss";
import { PlayerIcon } from "@/components/player/PlayerIcon";

export const PlayerContributions = () => {
  const contributions = useFishbowlSelector(selectAllPlayerContributions);

  return (
    <Flex className={styles.container}>
      <Flex className={styles.scrollable} direction="column" gap="2">
        {contributions?.map((contribution) => (
          <Flex
            className={styles.singleWord}
            direction="column"
            gap="1"
            key={contribution.word}
            p="2"
          >
            <DisplayText size="5">{contribution.word}</DisplayText>
            <Flex align="center" gap="2">
              <PlayerIcon dimension={20} player={contribution.contributedBy} />
              <DisplayText size="3">
                {contribution.contributedBy.displayName}
              </DisplayText>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
