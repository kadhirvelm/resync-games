/**
 * Declares a message handler for a socket. The same message handler is used to
 * send messages from the client and to receive messages from the server.
 */
export interface HandleMessage {
  [message: string]: unknown;
}

/**
 * Used to declare the interface for the expected socket implementation.
 */
export interface SocketDefinition<
  SendMessage extends HandleMessage,
  ReceiveMessage extends HandleMessage
> {
  receiveMessage: {
    [Key in keyof ReceiveMessage]: Key;
  };
  sendMessage: {
    [Key in keyof SendMessage]: Key;
  };
}

/**
 * The type to wrap the socket in to emit types messages.
 */
export type SocketEmitter<Message extends HandleMessage> = {
  [Key in keyof Message]: (payload: Message[Key]) => void;
};
