import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { GameInfo } from "@resync-games/api";
import {
  GameConfigurationField,
  MapGameConfiguration
} from "@resync-games/games/baseConfiguration";

export function canStartGame(gameInfo: GameInfo) {
  const accordingGame = getFrontendGame(gameInfo.gameType);

  const doesEveryPlayerHaveATeam = gameInfo.players.every(
    (p) => p.team !== undefined
  );

  return (
    doesEveryPlayerHaveATeam &&
    doesGameConfigurationHaveMinimalProperties(
      gameInfo.gameConfiguration as Record<string, object>,
      accordingGame.gameConfiguration
    )
  );
}

function doesGameConfigurationHaveMinimalProperties(
  gameConfiguration: Record<string, object>,
  accordingGameConfiguration: MapGameConfiguration<object>
) {
  const requiredKeys: [string, GameConfigurationField][] = Object.entries(
    accordingGameConfiguration
  ).filter(([_, value]: [string, GameConfigurationField]) => value.required);

  for (const [key] of requiredKeys) {
    if (gameConfiguration[key] === undefined) {
      return false;
    }
  }

  return true;
}
