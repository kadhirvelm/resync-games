import {
  CurrentGameState,
  GameStateAndInfo,
  PlayerId,
  WithTimestamp
} from "@resync-games/api";
import {
  CurentCyle,
  cycleTime
} from "@resync-games/games-shared/theStockTimes/cycleTime";
import _ from "lodash";
import { ICanChangeToState, IGameServer } from "../base";
import { AVAILABLE_STOCKS } from "./stocks/availableStocks";
import { NEWS_ARTICLES } from "./stocks/stockArticles";

export interface StockTimesCycle {
  dayTime: number;
  endDay: number;
  nightTime: number;
  startTime: string;
}

export interface StockPriceHistory extends WithTimestamp {
  price: number;
}

export interface Stock extends WithTimestamp {
  description: string;
  history: StockPriceHistory[];
  title: string;
}

export interface OwnedStock {
  date: string;
  price: number;
  quantity: number;
}

export interface TransactionHistory {
  date: string;
  price: number;
  quantity: number;
  stockSymbol: string;
  type: "buy" | "sell";
}

export interface StockTimesPlayer extends WithTimestamp {
  cash: number;
  ownedStocks: {
    [stockSymbol: string]: OwnedStock[];
  };
  team: number;
  transactionHistory: TransactionHistory[];
}

export type StockArticleImpact = -2 | -1 | 0 | 1 | 2;

export interface StockArticle extends WithTimestamp {
  addedOn: number;
  description: string;
  impact: StockArticleImpact;
  title: string;
}

export interface StockTimesNewsArticle extends WithTimestamp {
  articles: {
    [stockSymbol: string]: StockArticle[];
  };
  lastDay: number;
}

export interface TheStockTimesGame {
  cycle: StockTimesCycle;
  newsArticles: StockTimesNewsArticle;
  players: {
    [playerId: PlayerId]: StockTimesPlayer;
  };
  stocks: {
    [stockSymbol: string]: Stock;
  };
}

export interface TheStockTimesGameConfiguration {
  startingCash: number;
  totalStocks: number;
}

export class TheStockTimesServer
  implements IGameServer<TheStockTimesGame, TheStockTimesGameConfiguration>
{
  public async createGame(): Promise<{
    gameState: TheStockTimesGame;
    version: string;
  }> {
    return {
      gameState: {
        cycle: {
          dayTime: 60 * 1_000, // 40 seconds
          endDay: 16, // 15 full days = 15 minute game
          nightTime: 20 * 1_000, // 20 seconds
          startTime: new Date().toISOString()
        },
        newsArticles: {
          articles: {},
          lastDay: 0,
          lastUpdatedAt: new Date().toISOString()
        },
        players: {},
        stocks: {}
      },
      version: "1.0.0"
    };
  }

  public canChangeToState() {
    return { canChange: true as const };
  }

  public onChangeState(
    game: ICanChangeToState<TheStockTimesGame, TheStockTimesGameConfiguration>,
    newCurrentGameState: CurrentGameState
  ) {
    if (newCurrentGameState !== "playing") {
      return;
    }

    const newGameState = { ...game.gameState };
    for (const player of game.players) {
      newGameState.players[player.playerId] = {
        cash: game.gameConfiguration.startingCash,
        lastUpdatedAt: new Date().toISOString(),
        ownedStocks: {},
        team: player.team ?? 0,
        transactionHistory: []
      };
    }

    const randomStocks = _.sampleSize(
      AVAILABLE_STOCKS,
      game.gameConfiguration.totalStocks
    );
    for (const stock of randomStocks) {
      newGameState.stocks[stock.symbol] = {
        description: stock.description,
        history: stock.history.map((h) => ({
          ...h,
          lastUpdatedAt: new Date().toISOString()
        })),
        lastUpdatedAt: new Date().toISOString(),
        title: stock.title
      };

      newGameState.newsArticles.articles[stock.symbol] = [];
    }

    newGameState.cycle.startTime = new Date().toISOString();

    return newGameState;
  }

  public tickGameState(
    gameStateAndInfo: GameStateAndInfo<
      TheStockTimesGame,
      TheStockTimesGameConfiguration
    >
  ) {
    const newGameState = { ...gameStateAndInfo.gameState };
    const { day, currentCycle } = cycleTime(newGameState.cycle);

    newGameState.stocks = this.tickStockPrices(
      gameStateAndInfo.gameState.stocks,
      gameStateAndInfo.gameState.newsArticles.articles,
      currentCycle
    );
    newGameState.newsArticles = this.tickNewsArticles(
      gameStateAndInfo.gameState.newsArticles,
      day
    );

    return {
      gameState: newGameState,
      hasFinished: day >= newGameState.cycle.endDay
    };
  }

  private tickNewsArticles(
    newsArticles: TheStockTimesGame["newsArticles"],
    day: number
  ) {
    const newArticles = { ...newsArticles };

    if (newArticles.lastDay === day) {
      return newArticles;
    }

    for (const stock of Object.keys(newsArticles.articles)) {
      const newArticle = _.sample(NEWS_ARTICLES[stock] ?? []);
      if (newArticle === undefined) {
        throw new Error(
          `No news for stock ${stock}. Please contact an administrator to check the database and try again.`
        );
      }

      if (
        newArticles.articles[stock]?.find((s) => s.title === newArticle?.title)
      ) {
        newArticles.articles[stock].unshift({
          addedOn: day,
          description: "No news for today",
          impact: 0,
          lastUpdatedAt: new Date().toISOString(),
          title: "No news"
        });
        continue;
      }

      newArticles.articles[stock] = newArticles.articles[stock] ?? [];
      newArticles.articles[stock].unshift({
        addedOn: day,
        lastUpdatedAt: new Date().toISOString(),
        ...newArticle
      });
    }

    newArticles.lastDay = day;
    newArticles.lastUpdatedAt = new Date().toISOString();

    return newArticles;
  }

  private tickStockPrices(
    stocks: TheStockTimesGame["stocks"],
    newsArticles: StockTimesNewsArticle["articles"],
    currentCycle: CurentCyle
  ) {
    const newStocks = { ...stocks };
    if (currentCycle === "night") {
      return newStocks;
    }

    for (const symbol of Object.keys(stocks)) {
      const stock = newStocks[symbol];
      if (stock === undefined) {
        continue;
      }

      const priceHistory = stock.history;
      const lastPrice = stock.history[0]?.price;
      if (priceHistory === undefined || lastPrice === undefined) {
        continue;
      }

      const latestNewsArticle = newsArticles[symbol]?.[0];
      const { probabilityOfIncrease, percentOfLastPrice } =
        this.accountForNewsArticle(latestNewsArticle);

      const increaseOrDecrease =
        Math.random() >= 1 - probabilityOfIncrease ? 1 : -1;
      const priceDelta = Math.random() * (lastPrice * percentOfLastPrice);
      const finalPriceChange = increaseOrDecrease * priceDelta;

      const newPrice = Math.max(
        Math.round((lastPrice + finalPriceChange) * 100) / 100,
        0.01
      );
      stock.history.unshift({
        lastUpdatedAt: new Date().toISOString(),
        price: newPrice
      });

      stock.lastUpdatedAt = new Date().toISOString();
    }

    return newStocks;
  }

  private accountForNewsArticle(latestNewsArticle: StockArticle | undefined) {
    if (latestNewsArticle?.impact === 1) {
      return {
        percentOfLastPrice: 0.05,
        probabilityOfIncrease: 0.7
      };
    }

    if (latestNewsArticle?.impact === 2) {
      return {
        percentOfLastPrice: 0.1,
        probabilityOfIncrease: 0.8
      };
    }

    if (latestNewsArticle?.impact === -1) {
      return {
        percentOfLastPrice: 0.05,
        probabilityOfIncrease: 0.5
      };
    }

    if (latestNewsArticle?.impact === -2) {
      return {
        percentOfLastPrice: 0.1,
        probabilityOfIncrease: 0.4
      };
    }

    return {
      percentOfLastPrice: 0.025,
      probabilityOfIncrease: 0.6
    };
  }
}
