import { Injectable } from "@nestjs/common";

/**
 * The overall configuration for the application. Don't forget to update turbo.json to allow the variable
 * at build time.
 */
export interface ResyncGamesConfiguration {
  GAME_ORCHESTRATOR: boolean;
  GAME_STATE_DATABASE_HOST_URL: string | undefined;
  GAME_STATE_DIRECT_URL: string | undefined;
  NODE_ENV: "production" | "development";
}

@Injectable()
export class ConfigurationService {
  private configuration: ResyncGamesConfiguration = {
    GAME_ORCHESTRATOR:
      (process.env.GAME_ORCHESTRATOR ?? "").toString().toLowerCase() === "true",
    GAME_STATE_DATABASE_HOST_URL: process.env.GAME_STATE_DATABASE_HOST_URL,
    GAME_STATE_DIRECT_URL: process.env.GAME_STATE_DIRECT_URL,
    NODE_ENV: process.env.NODE_ENV as "production" | "development"
  };

  public get<T extends keyof ResyncGamesConfiguration>(
    key: T
  ): ResyncGamesConfiguration[T] {
    return this.configuration[key];
  }
}
