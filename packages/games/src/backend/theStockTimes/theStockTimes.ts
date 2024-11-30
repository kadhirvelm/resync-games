import { CurrentGameState, PlayerId } from "@resync-games/api";
import { ICanChangeToState, IGameServer } from "../base";

export interface TheStockTimesGame {
  players: {
    [playerId: PlayerId]: {
      cash: number;
      ownedStocks: {
        [stockSymbol: string]: [{ price: number; quantity: number }];
      };
      team: number;
    };
  };
  stocks: {
    [stockSymbol: string]: {
      description: string;
      history: [{ lastUpdatedAt: string; price: number }];
      title: string;
    };
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
        ownedStocks: {},
        team: player.team ?? 0
      };
    }

    newGameState.stocks = {
      ARE: {
        description:
          "AncientRuins Expeditions offers archaeological tourism and immersive historical experiences for culture enthusiasts.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 15.89
          }
        ],
        title: "AncientRuins Expeditions"
      },
      BSS: {
        description:
          "BrightSun Solar Solutions specializes in advanced solar panel technologies and renewable energy solutions for a sustainable future.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 123.45
          }
        ],
        title: "BrightSun Solar Solutions"
      },
      COC: {
        description:
          "CalmOcean Cruises provides luxury oceanic travel experiences, focusing on sustainability and relaxation for travelers.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 45.67
          }
        ],
        title: "CalmOcean Cruises"
      },
      CRM: {
        description:
          "ColorfulRainbow Media is a leading content creator focused on diverse, family-friendly entertainment across multiple platforms.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 67.45
          }
        ],
        title: "ColorfulRainbow Media"
      },
      DFI: {
        description:
          "DarkForest Innovations develops cutting-edge AI-driven cybersecurity solutions inspired by nature's complexity.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 89.23
          }
        ],
        title: "DarkForest Innovations"
      },
      FBA: {
        description:
          "FreshBreeze Aromatics creates eco-friendly air fresheners and home fragrances with nature-inspired scents.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 21.34
          }
        ],
        title: "FreshBreeze Aromatics"
      },
      FST: {
        description:
          "FierceStorm Technologies develops robust and scalable infrastructure solutions for businesses facing extreme data demands.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 142.56
          }
        ],
        title: "FierceStorm Technologies"
      },
      GRH: {
        description:
          "GentleRiver Hydropower harnesses river energy to provide clean and reliable electricity for sustainable development.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 78.34
          }
        ],
        title: "GentleRiver Hydropower"
      },
      PMR: {
        description:
          "PeacefulMeadow Retreats provides high-end wellness retreats in serene locations to promote relaxation and mental well-being.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 33.12
          }
        ],
        title: "PeacefulMeadow Retreats"
      },
      SGJ: {
        description:
          "SparklingGem Jewels crafts bespoke, high-quality jewelry, incorporating ethically sourced gemstones and modern designs.",
        history: [
          {
            lastUpdatedAt: new Date().toISOString(),
            price: 54.76
          }
        ],
        title: "SparklingGem Jewels"
      }
    };

    return newGameState;
  }
}
