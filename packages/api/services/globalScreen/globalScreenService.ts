import { Service, ServiceDefinition } from "../../genericTypes";
import { GameId, GameStateAndInfo, GameType } from "../gameState";

export interface GlobalGetGameState {
  gameId: GameId;
  gameType: GameType;
}

export interface GlobalScreenApi extends Service {
  getGameState: {
    payload: GlobalGetGameState;
    response: GameStateAndInfo;
  };
}

export const GlobalScreenServiceDefinition: ServiceDefinition<GlobalScreenApi> =
  {
    controller: "global-screen",
    endpoints: {
      getGameState: "get-game-state"
    }
  };
