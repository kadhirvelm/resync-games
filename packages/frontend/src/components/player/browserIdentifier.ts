import { PlayerId } from "@resync-games/api";
import { v4 } from "uuid";

const PLAYER_ID = "playerId";

export const getBrowserIdentifier = (): PlayerId => {
  const maybePlayerId = localStorage.getItem(PLAYER_ID);
  if (maybePlayerId != null) {
    return maybePlayerId as PlayerId;
  }

  const playerId = v4();
  localStorage.setItem(PLAYER_ID, playerId);

  return playerId as PlayerId;
};
