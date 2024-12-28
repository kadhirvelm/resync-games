import { StockArticleImpact } from "../theStockTimes";
import { NEWS_ARTICLES_ONE } from "./articles/one";
import { NEWS_ARTICLES_TWO } from "./articles/two";

export interface StockArticle {
  description: string;
  impact: StockArticleImpact;
  title: string;
}

export interface AvailableNewsArticles {
  [stockSymbol: string]: StockArticle[];
}

export const NEWS_ARTICLES = { ...NEWS_ARTICLES_ONE, ...NEWS_ARTICLES_TWO };
