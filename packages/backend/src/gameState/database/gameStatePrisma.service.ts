import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@resync-games/game-state-database";
import { GameStateConverterService } from "./gameStateConverter.service";

@Injectable()
export class GameStatePrismaService {
  public client: PrismaClient;

  constructor(public converterService: GameStateConverterService) {
    this.client = new PrismaClient({ log: ["query"] });
  }
}
