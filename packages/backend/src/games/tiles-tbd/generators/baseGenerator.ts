/* Abstract base class for all map generators */

import { CompleteTileMap } from "@/imports/api";

export abstract class BaseTileMapGenerator {
  // Generate a map
  public abstract generate(): CompleteTileMap;
}
