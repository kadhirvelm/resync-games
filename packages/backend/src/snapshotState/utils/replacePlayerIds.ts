import { PlayerId } from "@/imports/api";

export function replacePlayerIds(
  gameState: object,
  idMapping: Map<PlayerId, PlayerId>
) {
  let gameStateAsString = JSON.stringify(gameState);

  for (const [oldId, newId] of idMapping.entries()) {
    gameStateAsString = gameStateAsString.replaceAll(oldId, newId);
  }

  return JSON.parse(gameStateAsString);
}
