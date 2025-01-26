import { InternalServerErrorException } from "@nestjs/common";
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
  GameStateAndInfo,
  LeaveGame,
  PlayerId,
  JoinGame
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

  private clientsToGameId: Map<string, LeaveGame> = new Map();
  private playerIdToClient: Map<PlayerId, string> = new Map();

  private joinGameCallback?: (joinGame: JoinGame) => Promise<unknown>;
  private leaveGameCallback?: (leaveGame: LeaveGame) => Promise<unknown>;

  @WebSocketServer() server: Server;

  public setJoinGameCallback = (
    callback: (joinGame: JoinGame) => Promise<unknown>
  ) => {
    this.joinGameCallback = callback;
  };

  public setLeaveGameCallback = (
    callback: (leaveGame: LeaveGame) => Promise<unknown>
  ) => {
    this.leaveGameCallback = callback;
  };

  @getSocketDecorator(GameStateServerSocketDefinition.receiveMessage.identify)
  async identify(
    @MessageBody() identifier: IdentifyPlayerSocket,
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Client identified: ${identifier.playerId}`);

    this.clientsToGameId.set(client.id, {
      gameId: identifier.gameId,
      gameType: identifier.gameType,
      playerId: identifier.playerId
    });
    this.playerIdToClient.set(identifier.playerId, client.id);

    if (this.joinGameCallback == null) {
      throw new InternalServerErrorException(
        "Join game callback not set. Please check the instantiation of the GameStateSocketGateway and try again."
      );
    }

    this.getSocketEmitter(client).identify({
      gameId: identifier.gameId,
      gameType: identifier.gameType,
      playerId: identifier.playerId,
      socketId: identifier.socketId
    });

    const joinGame: JoinGame = {
      gameId: identifier.gameId,
      gameType: identifier.gameType,
      playerId: identifier.playerId
    };

    await this.joinGame(joinGame);
    await this.joinGameCallback(joinGame);
  }

  private joinGame = async (joinGame: JoinGame) => {
    const clientId = this.playerIdToClient.get(joinGame.playerId);
    if (clientId == null) {
      return;
    }

    await this.clients.get(clientId)?.join(joinGame.gameId);
  };

  async handleDisconnect(client: Socket) {
    super.handleDisconnect(client);

    const leaveGameDetails = this.clientsToGameId.get(client.id);
    if (leaveGameDetails == null) {
      return;
    }

    if (this.leaveGameCallback == null) {
      throw new InternalServerErrorException(
        "Leave game callback not set. Please check the instantiation of the GameStateSocketGateway and try again."
      );
    }

    await this.leaveGame(leaveGameDetails);
    await this.leaveGameCallback(leaveGameDetails);
  }

  private leaveGame = async (leaveGame: LeaveGame) => {
    const clientId = this.playerIdToClient.get(leaveGame.playerId);
    if (clientId == null) {
      return;
    }

    await this.clients.get(clientId)?.leave(leaveGame.gameId);
  };

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
