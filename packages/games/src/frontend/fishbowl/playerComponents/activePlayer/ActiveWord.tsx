import { DisplayText, Flex } from "@/lib/radix";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import styles from "./ActiveWord.module.scss";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export const ActiveWord = () => {
  const [viewingWord, setViewingWord] = useState(false);
  const activeWord = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round?.currentActiveWord
  );

  if (activeWord === undefined) {
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
        <DisplayText
          size="9"
          style={{ opacity: viewingWord ? 1 : 0.015 }}
          weight="bold"
        >
          {activeWord.word}
        </DisplayText>
      </Flex>
    </Flex>
  );
};
