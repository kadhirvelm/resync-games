import {
  HandleMessage,
  RemoveExtendsString,
  SocketDefinition,
  SocketEmitter
} from "@resync-games/api";
import { Socket } from "socket.io-client";

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

/**
 * A convenience function to register a socket handler for a given set of callbacks.
 */
export function registerSocketHandler<Message extends HandleMessage>(
  _definition: SocketDefinition<HandleMessage, Message>,
  socket: Socket,
  callbacks: SocketEmitter<
    RemoveExtendsString<Message> & {
      connect: Record<string, never>;
      disconnect: Record<string, never>;
    }
  >
) {
  for (const key in callbacks) {
    socket.on(key, (payload: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callbacks[key as keyof RemoveExtendsString<Message>](payload as any);
    });
  }
}
