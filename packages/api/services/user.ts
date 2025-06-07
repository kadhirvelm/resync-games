import { Service, ServiceDefinition } from "../genericTypes/service";
import { GameId, PlayerInGame } from "./gameState";

export type PlayerId = string & { __brand: "player-id" };

export interface BrowserIdentifier {
  playerId: PlayerId;
}

export interface Player {
  avatarCollection: string;
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
    response: PlayerInGame;
  };
  update: {
    payload: Player;
    response: PlayerInGame;
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
