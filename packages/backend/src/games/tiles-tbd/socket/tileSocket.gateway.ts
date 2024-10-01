import {
  ConnectedSocket,
  MessageBody,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import {
  IdentifySocket,
  NewPawnState,
  TileFromClientToServer,
  TileGameId,
  TileServerSocketDefinition
} from "@tiles-tbd/api";
import { Server, Socket } from "socket.io";
import {
  getSocketDecorator,
  getSocketEmitter,
  SocketGatewayHandleMessage
} from "src/genericTypes/socket";
import { SocketGateway } from "src/genericTypes/socket.gateway";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class TileSocketGateway
  extends SocketGateway
  implements SocketGatewayHandleMessage<TileFromClientToServer>
{
  public clients: Map<string, Socket> = new Map();

  @WebSocketServer() server: Server;

  @getSocketDecorator(TileServerSocketDefinition.receiveMessage.identify)
  identify(
    @MessageBody() identifier: IdentifySocket,
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Client identified: ${identifier.socketId}`);

    client.join(identifier.tileGameId);

    this.getSocketEmitter(client).identify({
      socketId: identifier.socketId,
      tileGameId: identifier.tileGameId
    });
  }

  public updatePawnState = (
    updatedPawnState: NewPawnState,
    tileGameId: TileGameId
  ) => {
    this.getServerEmitter(tileGameId).updatePawnState(updatedPawnState);
  };

  private getSocketEmitter = (client: Socket) => {
    return getSocketEmitter(TileServerSocketDefinition, client);
  };

  private getServerEmitter = (tileGameId: TileGameId) => {
    return getSocketEmitter(
      TileServerSocketDefinition,
      this.server,
      tileGameId
    );
  };
}
