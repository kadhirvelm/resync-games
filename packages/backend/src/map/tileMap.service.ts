import { Injectable } from "@nestjs/common";
import { CompleteTileMap, TileMap, TileMapId } from "@tiles-tbd/api";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class TileMapService {
  public constructor(private prismaService: PrismaService) {}

  public getTileMap = async (
    tileMapId: TileMapId
  ): Promise<CompleteTileMap> => {
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
}
