import {
  CurrentGameState,
  GameStateAndInfo,
  PlayerId
} from "@resync-games/api";
import { ICanChangeToState, IGameServer } from "../base";
import _ from "lodash";
import { AVAILABLE_STOCKS } from "./stocks/availableStocks";

export interface StockPriceHistory {
  lastUpdatedAt: string;
  price: number;
}

export interface Stock {
  description: string;
  history: StockPriceHistory[];
  lastUpdatedAt: string;
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

export interface TheStockTimesGame {
  players: {
    [playerId: PlayerId]: {
      cash: number;
      lastUpdatedAt: string;
      ownedStocks: {
        [stockSymbol: string]: OwnedStock[];
      };
      team: number;
      transactionHistory: TransactionHistory[];
    };
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
    if (gameStateAndInfo.currentGameState !== "playing") {
      return;
    }

    const newGameState = { ...gameStateAndInfo.gameState };

    const { stocks } = newGameState;
    for (const symbol of Object.keys(gameStateAndInfo.gameState.stocks)) {
      const stock = stocks[symbol];
      if (stock === undefined) {
        continue;
      }

      const priceHistory = stock.history;
      const lastPrice = stock.history[0]?.price;
      if (priceHistory === undefined || lastPrice === undefined) {
        continue;
      }

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

    return newGameState;
  }
}
