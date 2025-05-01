import {
  AvailableGameType,
  BACKEND_GAME_REGISTRY,
  IGameServer
} from "@/imports/games";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class GameRegistryService {
  public getGameRegistry = (gameType: string) => {
    const backend: IGameServer<object, object> | undefined =
      BACKEND_GAME_REGISTRY[gameType as AvailableGameType]?.gameServer;
    if (backend === undefined) {
      throw new BadRequestException(
        `The game type '${gameType}' is not implemented. Available games: [${Object.keys(BACKEND_GAME_REGISTRY).join(", ")}]`
      );
    }

    return backend;
  };
}
