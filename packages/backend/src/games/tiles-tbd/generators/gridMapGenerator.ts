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
} from "@/imports/api";
import { BaseTileMapGenerator } from "./baseGenerator";

type Directions = "N" | "S" | "E" | "W";

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

type TileOpening = {
  direction: Directions;
  square: GridTileSquare;
};

class GridTile {
  constructor(
    // 2D array of squares
    public squares: GridTileSquare[][],
    // The squares which can be connected to openings of another tile
    public openings: TileOpening[],
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

  translate(x: number, y: number): void {
    this.squares.forEach((row) => {
      row.forEach((square) => {
        square.posX += x;
        square.posY += y;
      });
    });
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
    this.normalizeCoords();
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

  private normalizeCoords(): void {
    // Make sure all coordinates are positive.
    let minX = 0,
      minY = 0;
    this.tiles.forEach((tile) => {
      tile.squares.forEach((row) => {
        row.forEach((square) => {
          minX = Math.min(minX, square.posX);
          minY = Math.min(minY, square.posY);
        });
      });
    });

    const transX = minX < 0 ? -minX : 0;
    const transY = minY < 0 ? -minY : 0;

    // Translate all squares so that the minimum x and y are 0
    this.tiles.forEach((tile) => {
      tile.translate(transX, transY);
    });
  }

  isValid(): boolean {
    // No two squares should overlap
    const coords: string[] = this.tiles.flatMap((tile) =>
      tile.squares.flatMap((row) =>
        row.map((square) => `${square.posX},${square.posY}`)
      )
    );

    if (new Set(coords).size !== coords.length) {
      return false;
    }

    return true;
  }
}

export class MagicMazeLikeMapGenerator extends BaseTileMapGenerator {
  public generate(): CompleteTileMap {
    // Generate till valid
    let grid = this.generateGridFromSequentialTiles();
    while (!grid.isValid()) {
      grid = this.generateGridFromSequentialTiles();
    }

    return grid.compile();
  }

  private generateGridTile(
    dimension: number = 2,
    minOpenings: number = 1,
    maxOpenings: number = 2
  ): GridTile {
    // First generate the squares, without any walls, and arrange in a 4x4 grid
    const squares: GridTileSquare[][] = [];
    for (let i = 0; i < dimension; i++) {
      squares.push([]);
      for (let j = 0; j < dimension; j++) {
        // Row number = y, column number = x
        squares[i].push(GridTileSquare.getBasicSquare(j, i));
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
    let boundarySquares: { direction: Directions; square: GridTileSquare }[] =
      [];
    for (let i = 0; i < dimension; i++) {
      boundarySquares.push({ direction: "N", square: squares[0][i] });
      boundarySquares.push({
        direction: "S",
        square: squares[dimension - 1][i]
      });
      boundarySquares.push({ direction: "W", square: squares[i][0] });
      boundarySquares.push({
        direction: "E",
        square: squares[i][dimension - 1]
      });
    }

    const numOpenings = _.random(
      Math.max(minOpenings, 0),
      Math.min(4, maxOpenings)
    );

    // No two openings should be from the same direction
    const openings: { direction: Directions; square: GridTileSquare }[] = [];
    for (let i = 0; i < numOpenings; i++) {
      const opening = _.sample(boundarySquares);
      if (opening === undefined) {
        throw new Error("No more openings available");
      }

      openings.push(opening);
      // Remove the squares with the same direction
      boundarySquares = boundarySquares.filter(
        (b) => b.direction !== opening.direction
      );
    }

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

    // For openings, remove the walls corresponding to the direction
    openings.forEach((opening) => {
      switch (opening.direction) {
        case "N":
          opening.square.northWall = false;
          break;
        case "S":
          opening.square.southWall = false;
          break;
        case "E":
          opening.square.eastWall = false;
          break;
        case "W":
          opening.square.westWall = false;
          break;
      }
    });

    // Assemble the grid tile
    return new GridTile(squares, openings, edges);
  }

  private generateGridFromSequentialTiles(
    numTiles: number = 4,
    tileDimension: number = 4
  ): Grid {
    // Simply create a sequence of tiles linearly connected together.
    const tiles: GridTile[] = [];
    // Starting and ending tile should have exactly one opening. The rest should have two.
    let prevTile: GridTile | undefined = undefined;
    for (let i = 0; i < numTiles; i++) {
      let newTile = this.generateGridTile(
        tileDimension,
        i === 0 || i === numTiles - 1 ? 1 : 2,
        i === 0 || i === numTiles - 1 ? 1 : 2
      );
      // We're being lazy here. Keep generating tiles until we find one that can be connected to the previous one.
      while (
        prevTile !== undefined &&
        !this.areCompatibleOpeningDirections(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          prevTile.openings.at(-1)!,
          newTile.openings[0]
        )
      ) {
        newTile = this.generateGridTile(
          tileDimension,
          i === 0 || i === numTiles - 1 ? 1 : 2,
          2
        );
      }
      tiles.push(newTile);
      prevTile = newTile;
    }
    // Add edges between the tiles
    const edges: GridTileSquareEdge[] = [];
    for (let i = 0; i < numTiles - 1; i++) {
      const src = tiles[i].openings.at(-1);
      const dest = tiles[i + 1].openings[0];

      if (src === undefined) {
        throw new Error("No opening in the source tile");
      }

      edges.push(
        new GridTileSquareEdge(
          src.square.id,
          dest.square.id,
          this.openingDirectionToEdgeDirection(src.direction)
        )
      );
      edges.push(
        new GridTileSquareEdge(
          dest.square.id,
          src.square.id,
          this.openingDirectionToEdgeDirection(dest.direction)
        )
      );
      const translation = this.getTileTranslation(src, dest);
      tiles[i + 1].translate(translation.x, translation.y);
    }

    return new Grid(tiles, edges);
  }

  private areCompatibleOpeningDirections(
    opening1: TileOpening,
    opening2: TileOpening
  ): boolean {
    return (
      (opening1.direction === "N" && opening2.direction === "S") ||
      (opening1.direction === "S" && opening2.direction === "N") ||
      (opening1.direction === "E" && opening2.direction === "W") ||
      (opening1.direction === "W" && opening2.direction === "E")
    );
  }

  private openingDirectionToEdgeDirection(
    direction: Directions
  ): "UP" | "DOWN" | "LEFT" | "RIGHT" {
    switch (direction) {
      case "N":
        return "UP";
      case "S":
        return "DOWN";
      case "E":
        return "RIGHT";
      case "W":
        return "LEFT";
    }
  }

  private getTileTranslation(
    src: TileOpening,
    dest: TileOpening
  ): { x: number; y: number } {
    // Based on the src and dest openings, determine how much the tile containing dest needs to be translated
    // for the two tiles to align correctly.
    // First, determine the coordinates of the tile corresponding to the dest opening
    const destTileX =
      src.direction === "E"
        ? src.square.posX + 1
        : src.direction === "W"
          ? src.square.posX - 1
          : src.square.posX;

    const destTileY =
      src.direction === "N"
        ? src.square.posY - 1
        : src.direction === "S"
          ? src.square.posY + 1
          : src.square.posY;

    return {
      x: destTileX - dest.square.posX,
      y: destTileY - dest.square.posY
    };
  }
}
