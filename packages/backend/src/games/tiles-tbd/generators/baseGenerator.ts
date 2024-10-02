/* Abstract base class for all map generators */

import { CompleteTileMap } from "@resync-games/api";

export abstract class BaseTileMapGenerator {
  // Generate a map
  public abstract generate(): CompleteTileMap;
}
