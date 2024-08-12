/* Abstract base class for all map generators */

import { CompleteTileMap } from "@tiles-tbd/api";

export abstract class BaseTileMapGenerator {
  // Generate a map
  public abstract generate(): CompleteTileMap;
}
