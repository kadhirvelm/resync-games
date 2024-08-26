import { HandleMessage, SocketDefinition } from "../genericTypes/socket";
import { IdentifySocket } from "./tileSocket/types";

export interface TileFromClientToServer extends HandleMessage {
  identify: IdentifySocket;
}

export interface TileFromServerToClient extends HandleMessage {
  identify: IdentifySocket;
}

export const TileClientSocketDefinition: SocketDefinition<
  TileFromClientToServer,
  TileFromServerToClient
> = {
  receiveMessage: {
    identify: "identify"
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
    identify: "identify"
  }
};
