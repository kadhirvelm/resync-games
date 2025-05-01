import { motion } from "motion/react";
import { Flex, DisplayText } from "@/lib/radix";
import { selectFocusedStockArticle } from "../store/selectors";
import { useStockTimesSelector } from "../store/theStockTimesRedux";
import styles from "./DayArticles.module.scss";

export const DayArticles = () => {
  const focusedStockArticle = useStockTimesSelector(selectFocusedStockArticle);

  if (focusedStockArticle === undefined) {
    return;
  }

  const renderArticle = () => {
    const title =
      focusedStockArticle.corruptedOn !== undefined
        ? "CORRUPTED"
        : focusedStockArticle.title;
    const description =
      focusedStockArticle.corruptedOn !== undefined
        ? `[CORRUPTED] ${focusedStockArticle.title}`
        : focusedStockArticle.description;
    return (
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        key={focusedStockArticle.title}
      >
        <Flex direction="column" flex="1" p="3">
          <Flex justify="between">
            <DisplayText size="4" weight="bold">
              {title}
            </DisplayText>
          </Flex>
          <Flex>
            <DisplayText color="gray">{description}</DisplayText>
          </Flex>
        </Flex>
      </motion.div>
    );
  };

  return (
    <Flex className={styles.articlesContainer} direction="column" gap="3" p="3">
      {renderArticle()}
    </Flex>
  );
};
