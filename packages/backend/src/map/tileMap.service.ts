import { Injectable } from "@nestjs/common";
import { CompleteTileMap, TileMap, TileMapId } from "@tiles-tbd/api";
import { PrismaService } from "src/database/prisma.service";
import { BaseTileMapGenerator } from "src/generators/baseGenerator";
import { MagicMazeLikeMapGenerator as MagicMazeSimpleTileMapGenerator } from "src/generators/gridMapGenerator";

const AVAILABLE_TILE_MAP_GENERATORS: Record<
  string,
  () => BaseTileMapGenerator
> = {
  magicMazeSimple: () => new MagicMazeSimpleTileMapGenerator()
};

@Injectable()
export class TileMapService {
  public constructor(private prismaService: PrismaService) {}

  public getTileMap = async (
    tileMapId: TileMapId
  ): Promise<CompleteTileMap> => {
    console.log("GOT HERE", tileMapId);
    const tileMap = await this.prismaService.client.tileMap.findFirst({
      include: { tiles: { include: { fromTile: true } } },
      where: { tileMapId }
    });

    const edges = tileMap.tiles.flatMap((tile) => tile.fromTile);

    return {
      edges: edges.map(this.prismaService.converterService.convertEdge),
      tileMap: this.prismaService.converterService.convertMap({
        createdAt: tileMap.createdAt,
        startingTileId: tileMap.startingTileId,
        tileMapId: tileMap.tileMapId
      }),
      tiles: tileMap.tiles.map(this.prismaService.converterService.convertTile)
    };
  };

  public getAllTileMaps = async (): Promise<TileMap[]> => {
    const allMaps = await this.prismaService.client.tileMap.findMany({});
    return allMaps.map(this.prismaService.converterService.convertMap);
  };

  public getAvailableTileMapGenerators = (): string[] => {
    return Object.keys(AVAILABLE_TILE_MAP_GENERATORS);
  };

  public generateTileMap = async (
    generatorName: string
  ): Promise<TileMapId> => {
    console.log("DID NOT GET HERE");
    const generator = AVAILABLE_TILE_MAP_GENERATORS[generatorName]();
    const tileMap = generator.generate();
    // Push the tile map to the database
    await this.prismaService.client.tileMap.create({
      data: {
        startingTileId: tileMap.tileMap.startingTileId,
        tileMapId: tileMap.tileMap.tileMapId,
        tiles: {
          create: tileMap.tiles.map((tile) => ({
            fromTile: {
              create: tileMap.edges
                .filter((edge) => edge.fromTileId === tile.tileId)
                .map((edge) => ({
                  edgeId: edge.edgeId,
                  flavorText: edge.flavorText,
                  fromTileId: edge.fromTileId,
                  toTileId: edge.toTileId
                }))
            },
            image: tile.image,
            posX: tile.posX,
            posY: tile.posY,
            tileId: tile.tileId,
            tileMapId: tileMap.tileMap.tileMapId,
            toTile: {
              create: tileMap.edges
                .filter((edge) => edge.toTileId === tile.tileId)
                .map((edge) => ({
                  edgeId: edge.edgeId,
                  flavorText: edge.flavorText,
                  fromTileId: edge.fromTileId,
                  toTileId: edge.toTileId
                }))
            }
          }))
        }
      }
    });

    return tileMap.tileMap.tileMapId;
  };
}
