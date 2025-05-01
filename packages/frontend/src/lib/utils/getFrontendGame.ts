import { GameType } from "@/imports/api";
import { GAME_REGISTRY, FrontendRegisteredGame } from "@/imports/games";

export function getFrontendGame(gameType: GameType) {
  const maybeGame = (GAME_REGISTRY as Record<string, FrontendRegisteredGame>)[
    gameType
  ];
  if (maybeGame === undefined) {
    throw new Error(`Game not found: ${gameType}`);
  }

  return maybeGame;
}
