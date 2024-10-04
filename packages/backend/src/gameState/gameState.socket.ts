import {
  ConnectedSocket,
  MessageBody,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import {
  IdentifyPlayerSocket,
  GameStateFromClientToServer,
  GameStateServerSocketDefinition,
  GameId,
  GameStateAndInfo
} from "@resync-games/api";
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
export class GameStateSocketGateway
  extends SocketGateway
  implements SocketGatewayHandleMessage<GameStateFromClientToServer>
{
  public clients: Map<string, Socket> = new Map();

  @WebSocketServer() server: Server;

  @getSocketDecorator(GameStateServerSocketDefinition.receiveMessage.identify)
  identify(
    @MessageBody() identifier: IdentifyPlayerSocket,
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Client identified: ${identifier.socketId}`);

    client.join(identifier.gameId);

    this.getSocketEmitter(client).identify({
      gameId: identifier.gameId,
      playerId: identifier.playerId,
      socketId: identifier.socketId
    });
  }

  public updateGameState = (
    updatedGameState: GameStateAndInfo,
    gameId: GameId
  ) => {
    this.getServerEmitter(gameId).emitUpdatedGameState(updatedGameState);
  };

  private getSocketEmitter = (client: Socket) => {
    return getSocketEmitter(GameStateServerSocketDefinition, client);
  };

  private getServerEmitter = (gameId: GameId) => {
    return getSocketEmitter(
      GameStateServerSocketDefinition,
      this.server,
      gameId
    );
  };
}
