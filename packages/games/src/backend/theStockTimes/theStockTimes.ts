import {
  CurrentGameState,
  GameStateAndInfo,
  PlayerId,
  WithTimestamp
} from "@resync-games/api";
import { ICanChangeToState, IGameServer } from "../base";
import _ from "lodash";
import { AVAILABLE_STOCKS } from "./stocks/availableStocks";
import {
  CurentCyle,
  cycleTime
} from "@resync-games/games-shared/theStockTimes/cycleTime";

export interface StockTimesCycle {
  dayTime: number;
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

export interface StockTimesNewsArticle {
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
          dayTime: 40 * 1_000, // 100 seconds
          nightTime: 20 * 1_000, // 20 seconds
          startTime: new Date().toISOString()
        },
        newsArticles: {
          articles: {},
          lastDay: 0
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
        history: stock.history,
        lastUpdatedAt: new Date().toISOString(),
        title: stock.title
      };
    }

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
      currentCycle
    );
    newGameState.newsArticles = this.tickNewsArticles(
      gameStateAndInfo.gameState.newsArticles,
      day
    );

    return newGameState;
  }

  private tickNewsArticles(
    newsArticles: TheStockTimesGame["newsArticles"],
    day: number
  ) {
    const newArticles = { ...newsArticles };

    if (newArticles.lastDay === day) {
      return newArticles;
    }

    newArticles.lastDay = day;

    // TODO: add one more article to each day

    return newArticles;
  }

  private tickStockPrices(
    stocks: TheStockTimesGame["stocks"],
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

      // TODO: take into account the latest news article when calculating the price

      const increaseOrDecrease = Math.random() > 0.6 ? 1 : -1;
      const priceDelta = Math.random() * (lastPrice * 0.025);

      const newPrice =
        Math.round((lastPrice + increaseOrDecrease * priceDelta) * 100) / 100;
      stock.history.unshift({
        lastUpdatedAt: new Date().toISOString(),
        price: newPrice
      });

      stock.lastUpdatedAt = new Date().toISOString();
    }

    return newStocks;
  }
}
