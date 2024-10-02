import { IGameServer } from "./backend/base";
import { PongGameServer } from "./backend/pong";

export const IMPLEMENTED_GAMES = ["pong"] as const;
export type ImplementedGame = (typeof IMPLEMENTED_GAMES)[number];
export const GAME_BACKEND_REGISTRY: Record<ImplementedGame, IGameServer> = {
  pong: new PongGameServer()
};
