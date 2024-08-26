import { SubscribeMessage } from "@nestjs/websockets";
import {
  HandleMessage,
  RemoveExtendsString,
  SocketDefinition,
  SocketEmitter
} from "@tiles-tbd/api";
import { Socket } from "socket.io";

/**
 * Handles receiving messages from the client and sending messages to the client.
 */
export type SocketGatewayHandleMessage<Message extends HandleMessage> = {
  [Key in keyof RemoveExtendsString<Message>]: (
    payload?: Message[Key],
    client?: Socket
  ) => void;
};

/**
 * Ensures the endpoint is listening for the right message event.
 */
export function getSocketDecorator(endpoint: string) {
  return SubscribeMessage(endpoint);
}

/**
 * A convenience function to create a typed socket emitter tied to the API definition.
 */
export function getSocketEmitter<Message extends HandleMessage>(
  definition: SocketDefinition<Message, HandleMessage>,
  socket: Socket
): SocketEmitter<Message> {
  const emitter = {} as SocketEmitter<Message>;

  for (const key in definition.sendMessage) {
    emitter[key as keyof Message] = (payload: unknown) => {
      socket.emit(key, payload);
    };
  }

  return emitter;
}
