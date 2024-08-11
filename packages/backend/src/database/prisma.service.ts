import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@tiles-tbd/database";
import { CompleteTileMap, TileMap } from "@tiles-tbd/api";
import { ConverterService } from "./converter.service";
import _ from "lodash";

@Injectable()
export class PrismaService {
  public client: PrismaClient;

  constructor(public converterService: ConverterService) {
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

  public getAllTileGames = async () => {
    const allGames = await this.client.tileGame.findMany({
      include: { tileMap: true }
    });
    const allMaps = _.uniqBy(
      allGames.flatMap((game) => game.tileMap),
      (map) => map.tileMapId
    );

    return {
      tileGames: allGames.map(this.converterService.convertTileGame),
      tileMaps: allMaps.map(this.converterService.convertMap)
    };
  };
}
