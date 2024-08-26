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
  private clients: Set<Socket> = new Set();

  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.log("WebSocket Gateway initialized");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  @getSocketDecorator(TileServerSocketDefinition.receiveMessage.identify)
  identify(
    @MessageBody() identifier: IdentifySocket,
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Client identified: ${identifier.socketId}`);

    const typedEmitter = getSocketEmitter(TileServerSocketDefinition, client);
    typedEmitter.identify({ socketId: identifier.socketId });
  }
}
