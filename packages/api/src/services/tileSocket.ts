import { HandleMessage, SocketDefinition } from "../genericTypes/socket";
import { IdentifySocket, NewGameState, NewPawnState } from "./tileSocket/types";

export interface TileFromClientToServer extends HandleMessage {
  identify: IdentifySocket;
}

export interface TileFromServerToClient extends HandleMessage {
  identify: IdentifySocket;
  updatePawnState: NewPawnState;
  updateGameState: NewGameState;
}

export const TileClientSocketDefinition: SocketDefinition<
  TileFromClientToServer,
  TileFromServerToClient
> = {
  receiveMessage: {
    identify: "identify",
    updatePawnState: "updatePawnState",
    updateGameState: "updateGameState"
  },
  sendMessage: {
    identify: "identify"
  }
};

export const TileServerSocketDefinition: SocketDefinition<
  TileFromServerToClient,
  TileFromClientToServer
> = {
  receiveMessage: {
    identify: "identify"
  },
  sendMessage: {
    identify: "identify",
    updatePawnState: "updatePawnState",
    updateGameState: "updateGameState"
  }
};
