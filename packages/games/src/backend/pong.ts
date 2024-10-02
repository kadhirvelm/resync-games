import { CreateGame, GameState } from "@resync-games/api";
import { IGameServer } from "./base";

export class PongGameServer implements IGameServer {
  createGame(createGameRequest: CreateGame): GameState {
    throw new Error("Method not implemented.");
  }
}
