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

export interface StockTimesCycle extends WithTimestamp {
  /**
   * The time in milliseconds that the day will last.
   */
  dayTime: number;
  /**
   * The day that the game will end on. This is a 1-based index.
   */
  endDay: number;
  /**
   * The time in milliseconds that the night will last.
   */
  nightTime: number;
  /**
   * The last time the cycle was updated. This is updated when we pause the game.
   */
  seedTime: number;
  /**
   * The time that the game started. This should update whenever we resume the game.
   */
  startTime: string;
  /**
   * The current state of the game. Remember to change the seedTime when resuming the game.
   */
  state: "playing" | "paused";
}

export interface StockPriceHistory extends WithTimestamp {
  price: number;
}

export interface Stock extends WithTimestamp {
  description: string;
  history: StockPriceHistory[];
  title: string;
}

export interface OwnedStockLock {
  /**
   * The time in milliseconds when the stock will be available again, after the lockedAt time.
   */
  availabilityTime: number;
  /**
   * The current time on the clock when the stock was locked.
   */
  lockedAt: number;
}

export interface OwnedStock {
  date: string;
  lockedUntil?: OwnedStockLock;
  price: number;
  quantity: number;
}

export interface TransactionHistory {
  /**
   * The current time on the clock in milliseconds when transaction happened.
   */
  clockTime: number;
  date: string;
  lossIntoGain?: boolean;
  price: number;
  quantity: number;
  stockSymbol: string;
  type: "buy" | "sell";
}

export interface StorePowerUpUsage {
  /**
   * The time in milliseconds when the power will be available again, after the usedAt time.
   */
  cooldownTime: number | undefined;
  /**
   * The current time on the clock when the power was used.
   */
  usedAt: number | undefined;
}

export interface StockTimesPlayer extends WithTimestamp {
  /**
   * The amount of cash the player has.
   */
  cash: number;
  /**
   * The amount of debt the player has.
   */
  debt: number;
  /**
   * Prevents the player from spending cash
   */
  lockCashSpending?: PowerLock;
  /**
   * The stocks the player owns. This will be used to determine the player's total value.
   */
  ownedStocks: {
    [stockSymbol: string]: OwnedStock[];
  };
  /**
   * Prevents the player from selling the stock.
   */
  stockLocks: {
    [stockSymbol: string]: PowerLock;
  };
  /**
   * The store powers the player has. This will be used to determine if the player can use a power.
   */
  storePowers: {
    /**
     * Allows the player to corrupt a news article, which changes a stock's article impact to minimal.
     */
    corruptedStock: StorePowerUpUsage;
    /**
     * Allows buying 2x the stock for the price of 1x.
     */
    discountBuy: StorePowerUpUsage;
    /**
     * Allows the player to take out a loan of some % of everyone's average value.
     */
    loan: StorePowerUpUsage;
    /**
     * Prevents a player from spending their cash for a set amount of time.
     */
    lockCashSpending: StorePowerUpUsage;
    /**
     * Converts the losses on a holding into gains.
     */
    lossIntoGain: StorePowerUpUsage;
    /**
     * Prevents a player from selling a stock for a set amount of time.
     */
    stockLock: StorePowerUpUsage;
    /**
     * Allows the player to transfer cash to another player, on their team.
     */
    transferCash: StorePowerUpUsage;
  };
  /**
   * The team the player is on.
   */
  team: number;
  /**
   * All the transactions the player has made, used to render a graph of overall performance at the end of the game.
   */
  transactionHistory: TransactionHistory[];
}

export type StockArticleImpact = -2 | -1 | 0 | 1 | 2;

export interface StockArticle extends WithTimestamp {
  addedOn: number;
  corruptedOn?: number;
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

export interface PowerLock {
  /**
   * The time in milliseconds when the stock will be available again, after the lockedAt time.
   */
  availabilityTime: number;
  /**
   * The current time on the clock when the stock was locked.
   */
  lockedAt: number;
}

export interface StockTimesPlayerActions extends WithTimestamp {
  cashInflux?: number;
  lockCashSpending?: PowerLock;
  stockLock?: {
    lock: PowerLock;
    stockSymbol: string;
  };
}

export interface StockTimesPendingPlayerActions {
  [playerId: PlayerId]: StockTimesPlayerActions;
}

export interface TheStockTimesGame {
  /**
   * The current cycle of the game. This will determine the time of day and the state of the game.
   */
  cycle: StockTimesCycle;
  /**
   * The news articles for the game. This will be used to determine the impact of the news on the stock prices.
   */
  newsArticles: StockTimesNewsArticle;
  /**
   * We want the player to be the source of truth for their portfolio, so when another player transfers money to them
   * we want the player's computer to update the final amount. We do that through this pending action mechanism.
   */
  pendingPlayerActions: StockTimesPendingPlayerActions;
  /**
   * The players in the game. This will be used to determine the player's cash, debt, and owned stocks.
   */
  players: {
    [playerId: PlayerId]: StockTimesPlayer;
  };
  /**
   * The stocks in the game. This is set when the game starts, not when it's created.
   */
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
          dayTime: 60 * 1_000, // 60 seconds
          endDay: 11, // 10 full days = 13 minute game,
          lastUpdatedAt: new Date().toISOString(),
          nightTime: 20 * 1_000, // 20 seconds
          seedTime: 0,
          startTime: new Date().toISOString(),
          state: "playing"
        },
        newsArticles: {
          articles: {},
          lastDay: 0,
          lastUpdatedAt: new Date().toISOString()
        },
        pendingPlayerActions: {},
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
        debt: 0,
        lastUpdatedAt: new Date().toISOString(),
        ownedStocks: {},
        stockLocks: {},
        storePowers: {
          corruptedStock: {
            cooldownTime: undefined,
            usedAt: undefined
          },
          discountBuy: {
            cooldownTime: undefined,
            usedAt: undefined
          },
          loan: {
            cooldownTime: undefined,
            usedAt: undefined
          },
          lockCashSpending: {
            cooldownTime: undefined,
            usedAt: undefined
          },
          lossIntoGain: {
            cooldownTime: undefined,
            usedAt: undefined
          },
          stockLock: {
            cooldownTime: undefined,
            usedAt: undefined
          },
          transferCash: {
            cooldownTime: undefined,
            usedAt: undefined
          }
        },
        team: player.team ?? 0,
        transactionHistory: []
      };

      newGameState.pendingPlayerActions[player.playerId] = {
        lastUpdatedAt: new Date().toISOString()
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
    if (gameStateAndInfo.gameState.cycle.state === "paused") {
      return;
    }

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
    if (latestNewsArticle?.corruptedOn !== undefined) {
      return {
        percentOfLastPrice: 0.015,
        probabilityOfIncrease: 0.5
      };
    }

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
