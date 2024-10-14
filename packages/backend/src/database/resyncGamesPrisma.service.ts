import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@resync-games/database";
import { ResyncGamesConverterService } from "./resyncGamesPrismaConverter.service";

@Injectable()
export class ResyncGamesPrismaService {
  public client: PrismaClient;

  constructor(public converterService: ResyncGamesConverterService) {
    this.client = new PrismaClient({ log: ["query"] });
  }
}
