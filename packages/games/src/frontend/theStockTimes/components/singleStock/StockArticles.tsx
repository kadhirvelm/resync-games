import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  MinusIcon
} from "@radix-ui/react-icons";
import { Flex, Text } from "../../../components";
import { useGameStateSelector } from "../../store/theStockTimesRedux";
import styles from "./StockArticles.module.scss";
import clsx from "clsx";
import { useState } from "react";

export const StockArticles = ({
  disableChangingArticle,
  viewingStockSymbol
}: {
  disableChangingArticle?: boolean;
  viewingStockSymbol: string;
}) => {
  const articles = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.newsArticles.articles
  );
  const articlesOnStock = articles?.[viewingStockSymbol];

  const [viewingArticle, setViewingArticle] = useState(0);

  if (articlesOnStock === undefined || articlesOnStock.length === 0) {
    return;
  }

  const requestedArticle = articlesOnStock[viewingArticle];
  if (requestedArticle === undefined) {
    return;
  }

  const renderImpact = () => {
    if (requestedArticle.impact === 0) {
      return <MinusIcon />;
    }

    if (requestedArticle.impact === 1) {
      return <ChevronUpIcon />;
    }

    if (requestedArticle.impact === 2) {
      return <DoubleArrowUpIcon />;
    }

    if (requestedArticle.impact === -1) {
      return <ChevronDownIcon />;
    }

    if (requestedArticle.impact === -2) {
      return <DoubleArrowDownIcon />;
    }
  };

  return (
    <Flex flex="1" gap="2">
      {!disableChangingArticle && viewingArticle > 0 && (
        <Flex
          className={styles.changeArticle}
          onClick={() => setViewingArticle(viewingArticle - 1)}
          px="2"
        >
          <Flex align="center">
            <ArrowLeftIcon />
          </Flex>
        </Flex>
      )}
      <Flex
        align="center"
        className={styles.articlesContainer}
        flex="1"
        gap="4"
        p="3"
      >
        <Flex
          align="center"
          className={clsx(styles.impactContainer, {
            [styles.one ?? ""]: requestedArticle.impact === 1,
            [styles.two ?? ""]: requestedArticle.impact === 2,
            [styles.minusOne ?? ""]: requestedArticle.impact === -1,
            [styles.minusTwo ?? ""]: requestedArticle.impact === -2
          })}
          justify="center"
          p="2"
        >
          {renderImpact()}
        </Flex>
        <Flex direction="column" flex="1">
          <Flex justify="between">
            <Text size="4" weight="bold">
              {requestedArticle.title}
            </Text>
            <Text>Day {requestedArticle.addedOn}</Text>
          </Flex>
          <Flex>
            <Text color="gray">{requestedArticle.description}</Text>
          </Flex>
        </Flex>
      </Flex>
      {!disableChangingArticle &&
        viewingArticle < articlesOnStock.length - 1 && (
          <Flex
            className={styles.changeArticle}
            onClick={() => setViewingArticle(viewingArticle + 1)}
            px="2"
          >
            <Flex align="center">
              <ArrowRightIcon />
            </Flex>
          </Flex>
        )}
    </Flex>
  );
};
