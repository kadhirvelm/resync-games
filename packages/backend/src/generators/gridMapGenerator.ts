/**
 * Logic for generating Magic-maze style 4x4 tiles and a map from them
 */

import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";
import {
  EdgeId,
  TileMapId,
  Tile,
  TileId,
  Edge,
  CompleteTileMap,
  TileMap
} from "@tiles-tbd/api";
import { BaseTileMapGenerator } from "./baseGenerator";

type GridTileSquareId = string;

class GridTileSquare {
  constructor(
    public posX: number,
    public posY: number,
    public northWall: boolean = false,
    public eastWall: boolean = false,
    public westWall: boolean = false,
    public southWall: boolean = false,
    public id: string = uuidv4()
  ) {}

  static getBasicSquare(posX: number, posY: number): GridTileSquare {
    return new GridTileSquare(posX, posY);
  }

  getImage(): string {
    const walls: string[] = [
      ...(this.northWall ? ["N"] : []),
      ...(this.southWall ? ["S"] : []),
      ...(this.westWall ? ["W"] : []),
      ...(this.eastWall ? ["E"] : [])
    ];
    // For now just return an encoding
    return `tile${walls.join("")}.png`;
  }

  // Compile the square into a tile corresponding to the core tile abstraction
  compile(mapId: string): Tile {
    return {
      image: this.getImage(),
      posX: this.posX,
      posY: this.posY,
      tileId: this.id as TileId,
      tileMapId: mapId as TileMapId
    };
  }
}

class GridTileSquareEdge {
  constructor(
    public src: GridTileSquareId,
    public dest: GridTileSquareId,
    public direction: "UP" | "DOWN" | "LEFT" | "RIGHT",
    public id: string = uuidv4()
  ) {}

  // Compile the edge into an edge corresponding to the core edge abstraction
  compile(): Edge {
    return {
      edgeId: this.id as EdgeId,
      flavorText: this.direction,
      fromTileId: this.src as TileId,
      toTileId: this.dest as TileId
    };
  }
}

class GridTile {
  constructor(
    // 2D array of squares
    public squares: GridTileSquare[][],
    // The squares which can be connected to openings of another tile
    public openings: GridTileSquareId[],
    // Edges between the squares
    public edges: GridTileSquareEdge[]
  ) {}

  // Compile the grid tile into a partial tile map
  compile(mapId: string): { edges: Edge[]; tiles: Tile[] } {
    const tiles: Tile[] = [];
    const edges: Edge[] = [];

    this.squares.forEach((row) => {
      row.forEach((square) => {
        tiles.push(square.compile(mapId));
      });
    });

    this.edges.forEach((edge) => {
      edges.push(edge.compile());
    });

    return { edges, tiles };
  }

  getStartingPosition(): GridTileSquareId {
    // the center
    return this.squares[1][1].id;
  }
}

class Grid {
  constructor(
    // List of tiles
    public tiles: GridTile[],
    // List of edges between squares of different tiles
    public edges: GridTileSquareEdge[]
  ) {}

  // Compile the grid into a complete tile map
  compile(): CompleteTileMap {
    const mapId = uuidv4();
    // Aggregate the tiles and edges from each tile
    const compiledTiles: Tile[] = [];
    const compiledEdges: Edge[] = [];
    this.tiles.forEach((tile) => {
      const { tiles, edges } = tile.compile(mapId);
      compiledTiles.push(...tiles);
      compiledEdges.push(...edges);
    });

    // Add the edges between tiles
    this.edges.forEach((edge) => {
      compiledEdges.push(edge.compile());
    });

    // Assemble the tile map
    const tileMap: TileMap = {
      startingTileId: this.tiles[0].getStartingPosition() as TileId,
      tileMapId: mapId as TileMapId
    };

    return {
      edges: compiledEdges,
      tileMap,
      tiles: compiledTiles
    };
  }
}

export class MagicMazeLikeMapGenerator extends BaseTileMapGenerator {
  public generate(): CompleteTileMap {
    return this.generateGridFromSequentialTiles().compile();
  }

  private generateGridTile(
    topLeftPosition: { x: number; y: number },
    dimension: number = 4,
    minOpenings: number = 1,
    maxOpenings: number = 2
  ): GridTile {
    // First generate the squares, without any walls, and arrange in a 4x4 grid
    const squares: GridTileSquare[][] = [];
    const { x: startX, y: startY } = topLeftPosition;
    for (let i = 0; i < dimension; i++) {
      squares.push([]);
      for (let j = 0; j < dimension; j++) {
        squares[i].push(GridTileSquare.getBasicSquare(startX + i, startY + j));
      }
    }

    // Add a north wall in the top row, east wall in the rightmost column, etc.
    for (let i = 0; i < dimension; i++) {
      squares[0][i].northWall = true;
      squares[dimension - 1][i].southWall = true;
      squares[i][0].westWall = true;
      squares[i][dimension - 1].eastWall = true;
    }

    // Pick between minOpenings and maxOpenings squares from the boundary squares to be openings.
    const boundarySquareIds: GridTileSquare[] = [];
    for (let i = 0; i < dimension; i++) {
      boundarySquareIds.push(squares[0][i]);
      boundarySquareIds.push(squares[dimension - 1][i]);
      boundarySquareIds.push(squares[i][0]);
      boundarySquareIds.push(squares[i][dimension - 1]);
    }

    const openings: GridTileSquare[] = _.sampleSize(
      boundarySquareIds,
      _.random(minOpenings, maxOpenings)
    );
    const openingSquareIds = openings.map((opening) => opening.id);

    // Remove the walls from the squares which are openings
    openings.forEach((opening) => {
      opening.northWall = false;
      opening.eastWall = false;
      opening.westWall = false;
      opening.southWall = false;
    });

    // For each of the first dimension - 1 rows, add between 0 to dimension - 1 south walls
    for (let i = 0; i < dimension - 1; i++) {
      const numSouthWalls = _.random(0, dimension - 1);
      const wallIndices = _.sampleSize(_.range(dimension), numSouthWalls);
      wallIndices.forEach((wallIndex) => {
        squares[i][wallIndex].southWall = true;
        squares[i + 1][wallIndex].northWall = true;
      });
    }

    const edges: GridTileSquareEdge[] = [];
    // For each row, all squares except the last one have an edge to the next square
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension - 1; j++) {
        edges.push(
          new GridTileSquareEdge(
            squares[i][j].id,
            squares[i][j + 1].id,
            "RIGHT"
          )
        );
        // In the other direction
        edges.push(
          new GridTileSquareEdge(squares[i][j + 1].id, squares[i][j].id, "LEFT")
        );
      }
    }

    // Determine the edges between squares in neighboring rows based on the north/south walls.
    for (let i = 0; i < dimension - 1; i++) {
      for (let j = 0; j < dimension; j++) {
        if (!squares[i][j].southWall && !squares[i + 1][j].northWall) {
          edges.push(
            new GridTileSquareEdge(
              squares[i][j].id,
              squares[i + 1][j].id,
              "DOWN"
            )
          );
          // In the other direction
          edges.push(
            new GridTileSquareEdge(squares[i + 1][j].id, squares[i][j].id, "UP")
          );
        }
      }
    }

    // Assemble the grid tile
    return new GridTile(squares, openingSquareIds, edges);
  }

  private generateGridFromSequentialTiles(
    numTiles: number = 1,
    tileDimension: number = 4
  ): Grid {
    // Simply create a sequence of tiles linearly connected together.
    const tiles: GridTile[] = [];
    // Starting and ending tile should have exactly one opening. The rest should have two.
    for (let i = 0; i < numTiles; i++) {
      tiles.push(
        this.generateGridTile(
          { x: i * tileDimension, y: 0 },
          tileDimension,
          i === 0 || i === numTiles - 1 ? 1 : 2,
          2
        )
      );
    }
    // Add edges between the tiles
    const edges: GridTileSquareEdge[] = [];
    for (let i = 0; i < numTiles - 1; i++) {
      const src = tiles[i].openings.at(-1);
      const dest = tiles[i + 1].openings[0];
      edges.push(new GridTileSquareEdge(src, dest, "RIGHT"));
      edges.push(new GridTileSquareEdge(dest, src, "LEFT"));
    }

    return new Grid(tiles, edges);
  }
}
