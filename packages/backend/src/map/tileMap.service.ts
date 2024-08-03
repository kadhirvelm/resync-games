import { Injectable } from "@nestjs/common";
import { CompleteTileMap, TileMap, TileMapId } from "@tiles-tbd/api";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class TileMapService {
  public constructor(private prismaService: PrismaService) {}

  public getTileMap = async (
    tileMapId: TileMapId
  ): Promise<CompleteTileMap> => {
    return this.prismaService.getTileMap(tileMapId);
  };

  public getAllTileMaps = async (): Promise<TileMap[]> => {
    return this.prismaService.getAllTileMaps();
  };
}
