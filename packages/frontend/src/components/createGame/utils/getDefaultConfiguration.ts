import { MapGameConfiguration } from "@resync-games/games/baseConfiguration";

export function getDefaultConfiguration(
  gameConfiguration: MapGameConfiguration<object>
) {
  const defaultConfiguration: Record<string, object> = {};

  for (const [key, value] of Object.entries(gameConfiguration)) {
    defaultConfiguration[key] = value.default;
  }

  return defaultConfiguration;
}
