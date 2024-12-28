import { useEffect, useMemo, useState } from "react";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { shuffle } from "lodash-es";
import { StockArticle } from "../../../backend/theStockTimes/theStockTimes";
import { Button, Flex, Text } from "../../components";
import styles from "./DayArticles.module.scss";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { selectArticles } from "../store/selectors";

export const DayArticles = () => {
  const { articles, lastestAddedOn } = useGameStateSelector(selectArticles);

  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    setSelectedDay(0);
  }, [lastestAddedOn]);

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
  }, [lastestAddedOn, selectedDay]);

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
        {viewingArticles.map((article) => (
          <Flex
            className={styles.articlesContainer}
            direction="column"
            flex="1"
            key={article.title}
            p="3"
          >
            <Flex justify="between">
              <Text size="4" weight="bold">
                {article.title}
              </Text>
            </Flex>
            <Flex>
              <Text color="gray">{article.description}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
