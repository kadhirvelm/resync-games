import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { selectShouldDisplayWords } from "../selectors/globalScreenSelectors";
import styles from "./ViewWords.module.scss";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export const ViewWords = () => {
  const shouldDisplayWords = useFishbowlSelector(selectShouldDisplayWords);
  const remainingWords = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.remainingWords ?? []
  );

  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    if (!shouldDisplayWords) {
      setShowWords(false);
      return;
    }

    // There's a race condition here where the user hits pause and then resume before 3 seconds, but
    // the hook clean up should take care of that by canceling the timer
    const timer = setTimeout(() => setShowWords(true), 3000);
    return () => clearTimeout(timer);
  }, [shouldDisplayWords]);

  const alphabetizedWords = [...remainingWords].sort((a, b) =>
    a.word.localeCompare(b.word)
  );

  return (
    <motion.div
      animate={{
        opacity: showWords ? 1 : 0,
        y: 0
      }}
      className={styles.motionDiv}
      initial={{
        opacity: 0
      }}
      key={showWords ? "show" : "hide"}
    >
      <Flex align="center" flex="1" justify="center">
        <Flex className={styles.wordsContainer} direction="column">
          <Flex gap="9" p="9" wrap="wrap">
            {alphabetizedWords.map((word, index) => (
              <DisplayText key={word.word + index} size="9">
                {word.word}
              </DisplayText>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.overlay} />
    </motion.div>
  );
};
