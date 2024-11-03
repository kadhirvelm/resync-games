import { BadRequestException, Injectable } from "@nestjs/common";
import {
  BACKEND_GAME_REGISTRY,
  AvailableGameType
} from "@resync-games/games/backendRegistry";
import { IGameServer } from "@resync-games/games/base";

@Injectable()
export class GameRegistryService {
  public getGameRegistry = (gameType: string) => {
    const backend: IGameServer<object> | undefined =
      BACKEND_GAME_REGISTRY[gameType as AvailableGameType]?.gameServer;
    if (backend === undefined) {
      throw new BadRequestException(
        `The game type '${gameType}' is not implemented. Available games: [${Object.keys(BACKEND_GAME_REGISTRY).join(", ")}]`
      );
    }

    return backend;
  };
}
