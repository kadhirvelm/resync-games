import { Service, ServiceDefinition } from "../genericTypes/service";
import { GameId, PlayerInGame } from "./gameState";

export type PlayerId = string & { __brand: "player-id" };

export interface BrowserIdentifier {
  playerId: PlayerId;
}

export interface Player {
  displayName: string;
  playerId: PlayerId;
}

export interface PlayerInGameWithDetails extends PlayerInGame {
  gameId?: GameId;
  gameType?: string;
  hasExited?: boolean;
}

export interface UserServiceApi extends Service {
  me: {
    payload: BrowserIdentifier;
    response: PlayerInGameWithDetails;
  };
  register: {
    payload: Player;
    response: Player;
  };
  update: {
    payload: Player;
    response: Player;
  };
}

export const UserServiceDefinition: ServiceDefinition<UserServiceApi> = {
  controller: "user",
  endpoints: {
    me: "me",
    register: "register",
    update: "update"
  }
};
