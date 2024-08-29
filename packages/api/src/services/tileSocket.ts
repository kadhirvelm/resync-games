import { HandleMessage, SocketDefinition } from "../genericTypes/socket";
import { IdentifySocket, NewPawnState } from "./tileSocket/types";

export interface TileFromClientToServer extends HandleMessage {
  identify: IdentifySocket;
}

export interface TileFromServerToClient extends HandleMessage {
  identify: IdentifySocket;
  updatePawnState: NewPawnState;
}

export const TileClientSocketDefinition: SocketDefinition<
  TileFromClientToServer,
  TileFromServerToClient
> = {
  receiveMessage: {
    identify: "identify",
    updatePawnState: "updatePawnState"
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
    updatePawnState: "updatePawnState"
  }
};
