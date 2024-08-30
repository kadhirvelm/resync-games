import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import {
  IdentifySocket,
  NewGameState,
  NewPawnState,
  TileFromClientToServer,
  TileServerSocketDefinition
} from "@tiles-tbd/api";
import { Server, Socket } from "socket.io";
import {
  getSocketDecorator,
  getSocketEmitter,
  SocketGatewayHandleMessage
} from "src/genericTypes/socket";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class SocketGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect,
    SocketGatewayHandleMessage<TileFromClientToServer>
{
  private logger = new Logger("Socket");
  public clients: Map<string, Socket> = new Map();

  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.log("WebSocket Gateway initialized");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.clients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client.id);
  }

  @getSocketDecorator(TileServerSocketDefinition.receiveMessage.identify)
  identify(
    @MessageBody() identifier: IdentifySocket,
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Client identified: ${identifier.socketId}`);
    this.getSocketEmitter(client).identify({ socketId: identifier.socketId });
  }

  public updatePawnState = (updatedPawnState: NewPawnState) => {
    this.server.emit(
      TileServerSocketDefinition.sendMessage.updatePawnState,
      updatedPawnState
    );
  };

  public updateGameState = (updatedGameState: NewGameState) => {
    this.server.emit(
      TileServerSocketDefinition.sendMessage.updateGameState,
      updatedGameState
    );
  }

  private getSocketEmitter = (client: Socket) => {
    return getSocketEmitter(TileServerSocketDefinition, client);
  };
}
