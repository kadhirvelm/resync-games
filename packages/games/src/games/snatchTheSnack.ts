import { GameState } from "..";
import { IGameServer } from "../baseGameSpec";

export class SnatchTheSnackGameServer implements IGameServer {
  createGame(_input: object): GameState {
    throw new Error("Method not implemented.");
  }
  getAvailableRoutes(): Record<string, (...args: unknown[]) => unknown> {
    throw new Error("Method not implemented.");
  }
  onStateUpdate(_update: object, _oldState: object, _newState: object): void {
    throw new Error("Method not implemented.");
  }
}
