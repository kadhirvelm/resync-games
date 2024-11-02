import { Service, ServiceDefinition } from "../genericTypes/service";

export type PlayerId = string & { __brand: "player-id" };

export interface BrowserIdentifier {
  playerId: PlayerId;
}

export interface Player {
  displayName: string;
  playerId: PlayerId;
}

export interface UserServiceApi extends Service {
  me: {
    payload: BrowserIdentifier;
    response: Player;
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
