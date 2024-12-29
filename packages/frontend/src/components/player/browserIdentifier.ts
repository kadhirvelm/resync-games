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

const GLOBAL_SCREEN_PLAYER_ID = "globalScreenPlayerId";

export const getGlobalScreenIdentifier = (): PlayerId => {
  const maybeGlobalScreenIdentifier = localStorage.getItem(
    GLOBAL_SCREEN_PLAYER_ID
  );
  if (maybeGlobalScreenIdentifier != null) {
    return maybeGlobalScreenIdentifier as PlayerId;
  }

  const globalScreenIdentifier = `${v4()}-global-screen`;
  localStorage.setItem(GLOBAL_SCREEN_PLAYER_ID, globalScreenIdentifier);

  return globalScreenIdentifier as PlayerId;
};
