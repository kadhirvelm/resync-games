import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@resync-games/database";
import { ResyncGamesConverterService } from "./resyncGamesPrismaConverter.service";
import ws from "ws";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { ConfigurationService } from "@/configuration/configuration.service";

neonConfig.webSocketConstructor = ws;

@Injectable()
export class ResyncGamesPrismaService {
  public logger = new Logger("PrismaClient");

  public client: PrismaClient;

  constructor(
    public converterService: ResyncGamesConverterService,
    private configService: ConfigurationService
  ) {
    const environment = this.configService.get("NODE_ENV");
    this.logger.log(`Creating prisma client - ${environment}`);

    if (environment === "production") {
      const pool = new Pool({
        connectionString: this.configService.get("GAME_STATE_DATABASE_HOST_URL")
      });
      const adapter = new PrismaNeon(pool);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.client = new PrismaClient({ adapter: adapter as any });
    } else {
      this.client = new PrismaClient();
    }
  }
}
