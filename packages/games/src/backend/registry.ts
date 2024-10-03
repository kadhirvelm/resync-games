import { IGameServer } from "./base";
import { PongGameServer } from "./pong/pong";
import { SnatchTheSnackServer } from "./snatch-the-snack/snatchTheSnack";

export const GAME_BACKEND_REGISTRY: Record<string, IGameServer> = {
  pong: new PongGameServer(),
  snatchTheSnack: new SnatchTheSnackServer()
};
