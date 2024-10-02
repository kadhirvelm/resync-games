import { GameState } from "..";
import { IGameServer } from "../baseGameSpec";

export class SnatchTheSnackGameServer implements IGameServer {
  createGame(input: object): GameState {
    throw new Error("Method not implemented.");
  }
  getAvailableRoutes(): Record<string, (...args: unknown[]) => unknown> {
    throw new Error("Method not implemented.");
  }
  onStateUpdate(update: object, oldState: object, newState: object): void {
    throw new Error("Method not implemented.");
  }
}
