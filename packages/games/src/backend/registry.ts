import { IGameServer } from "./base";
import { PongGameServer } from "./pong";

export const GAME_BACKEND_REGISTRY: Record<string, IGameServer> = {
  pong: new PongGameServer()
};
