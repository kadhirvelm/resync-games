import { HandleMessage, SocketDefinition } from "../../genericTypes";
import { GameId, GameStateAndInfo, PlayerId } from "./gameStateTypes";

export interface IdentifyPlayerSocket {
  gameId: GameId;
  playerId: PlayerId;
  socketId: string;
}

export interface GameStateFromClientToServer extends HandleMessage {
  identify: IdentifyPlayerSocket;
}

export interface GameStateFromServerToClient extends HandleMessage {
  emitUpdatedGameState: GameStateAndInfo;
  identify: IdentifyPlayerSocket;
}

export const GameStateClientSocketDefinition: SocketDefinition<
  GameStateFromClientToServer,
  GameStateFromServerToClient
> = {
  receiveMessage: {
    emitUpdatedGameState: "emitUpdatedGameState",
    identify: "identify"
  },
  sendMessage: {
    identify: "identify"
  }
};

export const GameStateServerSocketDefinition: SocketDefinition<
  GameStateFromServerToClient,
  GameStateFromClientToServer
> = {
  receiveMessage: {
    identify: "identify"
  },
  sendMessage: {
    emitUpdatedGameState: "emitUpdatedGameState",
    identify: "identify"
  }
};
