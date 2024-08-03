import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@tiles-tbd/database";
import { CompleteTileMap, TileMap } from "@tiles-tbd/api";
import { ConverterService } from "./converter.service";

@Injectable()
export class PrismaService {
  public client: PrismaClient;

  constructor(private converterService: ConverterService) {
    this.client = new PrismaClient({ log: ["query"] });
  }

  public getAllTileMaps = async (): Promise<TileMap[]> => {
    const allMaps = await this.client.tileMap.findMany({});
    return allMaps.map(this.converterService.convertMap);
  };

  public getTileMap = async (tileMapId: string): Promise<CompleteTileMap> => {
    const tileMap = await this.client.tileMap.findFirst({
      include: { tiles: { include: { fromTile: true } } },
      where: { tileMapId }
    });

    const edges = tileMap.tiles.flatMap((tile) => tile.fromTile);

    return {
      edges: edges.map(this.converterService.convertEdge),
      tileMap: this.converterService.convertMap({
        createdAt: tileMap.createdAt,
        startingTileId: tileMap.startingTileId,
        tileMapId: tileMap.tileMapId
      }),
      tiles: tileMap.tiles.map(this.converterService.convertTile)
    };
  };
}
