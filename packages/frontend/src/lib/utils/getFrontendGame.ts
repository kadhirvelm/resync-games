import { GameType } from "@resync-games/api";
import {
  GAME_REGISTRY,
  FrontendRegisteredGame
} from "@resync-games/games/frontendRegistry";

export function getFrontendGame(gameType: GameType) {
  const maybeGame = (GAME_REGISTRY as Record<string, FrontendRegisteredGame>)[
    gameType
  ];
  if (maybeGame === undefined) {
    throw new Error(`Game not found: ${gameType}`);
  }

  return maybeGame;
}
