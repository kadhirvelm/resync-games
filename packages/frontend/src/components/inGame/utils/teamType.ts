import { GameInfo } from "../../../imports/api";
import { ResyncTeamConfiguration } from "../../../imports/games";
import { getFrontendGame } from "../../../lib/utils/getFrontendGame";

export function teamType(gameInfo: GameInfo): ResyncTeamConfiguration {
  const accordingGame = getFrontendGame(gameInfo.gameType);
  return accordingGame.teamConfiguration ?? "2-teams";
}
