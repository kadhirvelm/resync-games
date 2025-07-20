import { PlayerId } from "@/imports/api";

export function replacePlayers(
  gameState: object,
  idMapping: Map<PlayerId, PlayerId>,
  displayNameMapping: Map<PlayerId, { new: string; old: string }>
) {
  let gameStateAsString = JSON.stringify(gameState);

  for (const [oldId, newId] of idMapping.entries()) {
    gameStateAsString = gameStateAsString.replaceAll(oldId, newId);

    const maybeNewDispayName = displayNameMapping.get(oldId);
    if (maybeNewDispayName === undefined) {
      continue;
    }

    const { old, new: newDisplayName } = maybeNewDispayName;
    gameStateAsString = gameStateAsString.replaceAll(
      `"displayName":"${old}"`,
      `"displayName":"${newDisplayName}"`
    );
  }

  return JSON.parse(gameStateAsString);
}
