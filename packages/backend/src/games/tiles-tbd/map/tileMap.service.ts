import { Injectable } from "@nestjs/common";
import { TileMapId } from "@resync-games/api";
import { writeFileSync } from "fs";
import { BaseTileMapGenerator } from "../generators/baseGenerator";
import { MagicMazeLikeMapGenerator } from "../generators/gridMapGenerator";

const AVAILABLE_TILE_MAP_GENERATORS: Record<
  string,
  () => BaseTileMapGenerator
> = {
  magicMazeSimple: () => new MagicMazeLikeMapGenerator()
};

@Injectable()
export class TileMapService {
  public getAvailableTileMapGenerators = (): string[] => {
    return Object.keys(AVAILABLE_TILE_MAP_GENERATORS);
  };

  public generateTileMap = async (
    generatorName: string
  ): Promise<TileMapId> => {
    const generator = AVAILABLE_TILE_MAP_GENERATORS[generatorName]();
    const tileMap = generator.generate();

    writeFileSync(
      `${tileMap.tileMap.tileMapId}.json`,
      JSON.stringify(tileMap, null, 2)
    );

    return tileMap.tileMap.tileMapId;
  };
}
