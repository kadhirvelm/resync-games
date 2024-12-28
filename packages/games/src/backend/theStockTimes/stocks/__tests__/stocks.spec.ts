import { describe, it } from "@jest/globals";
import { AVAILABLE_STOCKS } from "../availableStocks";
import { NEWS_ARTICLES } from "../stockArticles";

describe("Stock related tests", () => {
  it("all stocks should have articles available", () => {
    for (const stock of AVAILABLE_STOCKS) {
      const accordingArticles = NEWS_ARTICLES[stock.symbol];
      expect(accordingArticles).toBeDefined();
      expect(accordingArticles?.length).toBeGreaterThan(15);
    }
  });
});
