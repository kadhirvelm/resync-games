import { useEffect, useState } from "react";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { motion } from "motion/react";
import { DisplayText, Flex } from "@/lib/radix";
import styles from "./NextRoundIdentifier.module.scss";

export const NextRoundIdentifier = () => {
  const activeRoundNumber = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.roundNumber
  );

  const [showIdentifier, setShowIdentifier] = useState(false);

  useEffect(() => {
    if (activeRoundNumber === undefined || activeRoundNumber === 0) {
      return;
    }

    setShowIdentifier(true);
    const timer = setTimeout(() => setShowIdentifier(false), 2000);
    return () => clearTimeout(timer);
  }, [activeRoundNumber]);

  if (!showIdentifier) {
    return;
  }

  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0
      }}
      initial={{
        opacity: 0
      }}
    >
      <Flex className={styles.nextRoundIdentifier} p="9">
        <DisplayText size="9">Next round!</DisplayText>
      </Flex>
      <Flex className={styles.modal} />
    </motion.div>
  );
};
