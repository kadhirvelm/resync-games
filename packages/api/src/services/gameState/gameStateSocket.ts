import { HandleMessage, SocketDefinition } from "../../genericTypes";
import { GameId, GameState, PlayerId } from "./gameStateTypes";

export interface IdentifyPlayerSocket {
  gameId: GameId;
  playerId: PlayerId;
  socketId: string;
}

export interface GameStateFromClientToServer extends HandleMessage {
  identify: IdentifyPlayerSocket;
}

export interface GameStateFromServerToClient extends HandleMessage {
  identify: IdentifyPlayerSocket;
  updateGameState: GameState;
}

export const GameStateClientSocketDefinition: SocketDefinition<
  GameStateFromClientToServer,
  GameStateFromServerToClient
> = {
  receiveMessage: {
    identify: "identify",
    updateGameState: "updateGameState"
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
    identify: "identify",
    updateGameState: "updateGameState"
  }
};
