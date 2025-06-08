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
    if (activeRoundNumber === undefined || activeRoundNumber === 1) {
      return;
    }

    setShowIdentifier(true);
    const timer = setTimeout(() => setShowIdentifier(false), 2500);
    return () => clearTimeout(timer);
  }, [activeRoundNumber]);

  return (
    <motion.div
      animate={{
        opacity: showIdentifier ? 1 : 0,
        y: 0
      }}
      initial={{
        opacity: showIdentifier ? 0 : 1
      }}
      key={showIdentifier ? "show" : "hide"}
    >
      <Flex className={styles.nextRoundIdentifier} p="9">
        <DisplayText size="9">Next round!</DisplayText>
      </Flex>
      <Flex className={styles.modal} />
    </motion.div>
  );
};
