import React, { useEffect, useRef, useState } from "react";
import { Tile } from "@tiles-tbd/api";
import { selectPawnIndex } from "@/stores/tiles/selectors/selectPawnState";
import {
  TileAppStore,
  useTileAppStore,
  useTileSelector
} from "@/stores/tiles/tilesStore";
import { useImageCache } from "./utils/imageCache";
import { BaseScene } from "@/lib/game/baseScene";
import { BaseGame } from "@/lib/game/baseGame";
import dynamic from "next/dynamic";

const COLORS = {
  blue: "#2e86c1",
  green: "#1d8348",
  red: "#cb4335",
  yellow: "#f1c40f"
};

export class MagicMazeScene extends BaseScene {
  private tileSize: number = 100;
  private tileGap: number = -15;

  constructor(private store: TileAppStore) {
    super("MagicMazeScene");
  }

  getTiles(): Tile[] {
    const state = this.store.getState();
    const tiles = state.tileMap.map?.tiles;
    if (!tiles) {
      return [];
    }
    return tiles;
  }

  preload() {
    for (const tile of this.getTiles()) {
      this.load.image(tile.image, `/images/${tile.image}`);
    }
  }

  create() {
    this.renderTiles(this.getTiles());
    return;
  }

  update() {
    return;
  }

  shutdown() {
    return;
  }

  renderTiles(tiles: Tile[]) {
    for (const tile of tiles) {
      const image = this.add.image(
        tile.posX * (this.tileSize + this.tileGap),
        tile.posY * (this.tileSize + this.tileGap),
        tile.image
      );
      image.setOrigin(0, 0);
      image.setDisplaySize(this.tileSize, this.tileSize);
    }
  }
}

export class MagicMazeGame extends BaseGame {
  constructor(
    parent: HTMLElement,
    private store: TileAppStore
  ) {
    super(parent, [new MagicMazeScene(store)]);
  }
}

const Canvas = ({
  width,
  height,
  draw
}: {
  draw: (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => Promise<void>;
  height: number;
  width: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const canvasUpdate = async () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("Could not get tiles canvas ref");
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Could not get 2d context from tiles canvas");
        return;
      }
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(scale, scale);

      await draw(canvas, ctx);
      ctx.restore();
    };
    canvasUpdate();
  });

  return (
    <canvas
      height={height}
      onMouseDown={(e) => {
        const startX = e.clientX - pan.x;
        const startY = e.clientY - pan.y;
        const handleMouseMove = (e: MouseEvent) => {
          setPan({ x: e.clientX - startX, y: e.clientY - startY });
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener(
          "mouseup",
          () => {
            document.removeEventListener("mousemove", handleMouseMove);
          },
          { once: true }
        );
      }}
      onWheel={(e) => {
        const newScale = scale + e.deltaY * -0.001;
        setScale(Math.min(Math.max(0.1, newScale), 5));
      }}
      ref={canvasRef}
      style={{ cursor: "grab" }}
      width={width}
    />
  );
};

const DisplayTilesAndPawns = ({
  tiles,
  tileSize,
  gap
}: {
  gap: number;
  tileSize: number;
  tiles: Tile[];
}) => {
  const pawnsIndexed = useTileSelector(selectPawnIndex);
  const imageCache = useImageCache();

  // TODO(rohan): I don't know how to operate redux and get the total number of pawns directly.
  // So, I'm calculating it here.
  const allPawnIds: Set<string> = new Set();
  for (const pawns of Object.values(pawnsIndexed)) {
    for (const pawn of pawns) {
      allPawnIds.add(pawn.tilePawnId);
    }
  }
  const numPawns = allPawnIds.size;

  // We draw the pawns as circles, making sure they don't overlap.
  // Thus we arrange the circles in a square with a calculated radius.
  const sqDimension = Math.ceil(Math.sqrt(numPawns));
  const radius = Math.floor(tileSize / (2 * sqDimension));

  return (
    <Canvas
      draw={async (_canvas, ctx) => {
        // Draw each tile
        await Promise.all(
          tiles.map(async ({ posX: x, posY: y, image }) => {
            const posX = x * (tileSize + gap);
            const posY = y * (tileSize + gap);

            const cachedImg = await imageCache.getCachedImage(
              `/images/${image}`
            );
            ctx.drawImage(cachedImg, posX, posY, tileSize, tileSize);
          })
        );

        // Draw the pawns
        await Promise.all(
          tiles.map(async ({ posX: x, posY: y, tileId }) => {
            const pawnsOnThisTile = pawnsIndexed[tileId] ?? [];
            const posX = x * (tileSize + gap);
            const posY = y * (tileSize + gap);

            for (let i = 0; i < pawnsOnThisTile.length; i++) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              const pawn = pawnsOnThisTile[i]!;
              const pawnPosX = posX + radius + 2 * radius * (i % sqDimension);
              const pawnPosY =
                posY + radius + 2 * radius * Math.floor(i / sqDimension);
              ctx.beginPath();
              ctx.arc(pawnPosX, pawnPosY, tileSize / 8, 0, 2 * Math.PI);
              ctx.fillStyle =
                COLORS[pawn.color as keyof typeof COLORS] ?? pawn.color;
              ctx.fill();
            }
          })
        );
      }}
      // Use the screen width and height to draw the canvas
      height={window.innerHeight}
      width={window.innerWidth}
    />
  );
};

export const DisplayTiles = ({
  tiles,
  tileSize = 100,
  gap = -15
}: {
  gap?: number;
  tileSize?: number;
  tiles: Tile[];
}) => {
  return (
    <div>
      <DisplayTilesAndPawns gap={gap} tileSize={tileSize} tiles={tiles} />
    </div>
  );
};

export const DisplayMagicMazeGame = () => {
  const parentElement = useRef<HTMLDivElement>(null);
  const store = useTileAppStore();

  useEffect(() => {
    if (parentElement.current) {
      const game = new MagicMazeGame(parentElement.current, store);
      return () => {
        game.destroy();
      };
    }
  });

  return <div ref={parentElement} />;
};

export const DynamicMagicMazeGame = dynamic(
  () => Promise.resolve(DisplayMagicMazeGame),
  {
    ssr: false
  }
);
