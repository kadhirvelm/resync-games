import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../../store/fishbowlRedux";
import styles from "./ActiveWord.module.scss";
import { useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { motion } from "motion/react";

export const ActiveWord = ({ sampleWord }: { sampleWord?: string }) => {
  const [viewingWord, setViewingWord] = useState(true);
  const activeWord = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActiveWord
  );

  const finalActiveWord = sampleWord ?? activeWord?.word;

  useEffect(() => {
    setViewingWord(true);

    const timeout = setTimeout(() => {
      setViewingWord(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [finalActiveWord]);

  if (finalActiveWord === undefined) {
    return;
  }

  const onViewWord = () => setViewingWord(true);
  const onHideWord = () => setViewingWord(false);

  return (
    <Flex
      align="center"
      className={styles.wordContainer}
      flex="1"
      justify="center"
      onMouseDown={onViewWord}
      onMouseUp={onHideWord}
      onTouchEnd={onHideWord}
      onTouchStart={onViewWord}
      p="4"
      wrap="wrap"
    >
      <Flex align="center" gap="2">
        {viewingWord ? <Eye size={40} /> : <EyeClosed size={40} />}
        <motion.div
          animate={{ opacity: viewingWord ? 1 : 0.015 }}
          key={finalActiveWord}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <DisplayText size="9" weight="bold">
            {finalActiveWord}
          </DisplayText>
        </motion.div>
      </Flex>
    </Flex>
  );
};
