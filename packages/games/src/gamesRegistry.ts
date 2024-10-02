import { IGameServer } from "./backend/base";
import { PongGameServer } from "./backend/pong";

export const GAME_REGISTRY = {
  pong: "Pong"
};
export type ImplementedGame = keyof typeof GAME_REGISTRY;
export const GAME_BACKEND_REGISTRY: Record<string, IGameServer> = {
  pong: new PongGameServer()
};
