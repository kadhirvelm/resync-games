import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { shuffle } from "lodash-es";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { StockArticle } from "../../../backend/theStockTimes/theStockTimes";
import { Button, Flex, Text } from "../../components";
import { selectArticles } from "../store/selectors";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { ArticleText } from "./articles/ArticleText";
import styles from "./DayArticles.module.scss";

export const DayArticles = () => {
  const { articles, lastestAddedOn } = useGameStateSelector(selectArticles);

  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    setSelectedDay(0);
  }, [lastestAddedOn]);

  const anyCorrupted = articles
    .map((a) => a?.[selectedDay]?.corruptedOn ?? "")
    .join("");

  const viewingArticles: StockArticle[] = useMemo(() => {
    const collapsedArticles = articles.map((a) => a?.[selectedDay]);
    const filteredArticles = collapsedArticles.filter(
      (article) => article !== undefined && article?.title !== "No news"
    ) as StockArticle[];

    if (filteredArticles.length === 0) {
      return [
        collapsedArticles[0] ??
          ({
            addedOn: 0,
            description: "No news",
            impact: 0,
            lastUpdatedAt: new Date().toISOString(),
            title: "No news"
          } as StockArticle)
      ];
    }

    return shuffle(filteredArticles);
  }, [lastestAddedOn, selectedDay, anyCorrupted]);

  return (
    <Flex
      className={styles.articlesContainer}
      direction="column"
      flex="1"
      gap="3"
      p="3"
    >
      <Flex justify="between">
        <Flex>
          <Button
            disabled={selectedDay === 0}
            onClick={() => setSelectedDay(selectedDay - 1)}
          >
            <ArrowLeftIcon />
          </Button>
        </Flex>
        <Text size="4">Day {viewingArticles[0]?.addedOn} news</Text>
        <Flex gap="3" justify="end">
          {selectedDay !== 0 && (
            <Button color="red" onClick={() => setSelectedDay(0)}>
              Today
            </Button>
          )}
          <Button
            disabled={viewingArticles[0]?.addedOn === 0}
            onClick={() => setSelectedDay(selectedDay + 1)}
          >
            <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column" gap="2">
        {viewingArticles.map((article) => {
          const title =
            article.corruptedOn !== undefined ? "CORRUPTED" : article.title;
          const description =
            article.corruptedOn !== undefined
              ? `[CORRUPTED] ${article.title}`
              : article.description;
          return (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              key={article.title}
            >
              <Flex
                className={styles.articlesContainer}
                direction="column"
                flex="1"
                p="3"
              >
                <Flex justify="between">
                  <Text size="4" weight="bold">
                    <ArticleText text={title} />
                  </Text>
                </Flex>
                <Flex>
                  <Text color="gray">
                    <ArticleText text={description} />
                  </Text>
                </Flex>
              </Flex>
            </motion.div>
          );
        })}
      </Flex>
    </Flex>
  );
};
