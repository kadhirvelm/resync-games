import React, { useEffect, useRef } from "react";
import { Tile } from "@tiles-tbd/api";
import { selectPawnIndex } from "@/stores/tiles/selectPawnState";
import { useTileSelector } from "@/stores/tiles/tilesStore";

const TileCanvas = ({
  tiles,
  tileSize,
  gap
}: {
  gap: number;
  tileSize: number;
  tiles: Tile[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each tile
    tiles.forEach(({ posX: x, posY: y, image }) => {
      const img = new Image();
      img.src = `/images/${image}`;
      const posX = x * (tileSize + gap);
      const posY = y * (tileSize + gap);

      img.onload = () => {
        ctx.drawImage(img, posX, posY, tileSize, tileSize);
      };
    });
  }, [tiles, tileSize, gap]);

  return (
    <canvas
      height={
        (Math.max(...tiles.map((t) => t.posY)) + 1) *
        (tileSize + Math.max(0, gap))
      }
      ref={canvasRef}
      style={{ left: 0, position: "absolute", top: 0 }}
      width={
        (Math.max(...tiles.map((t) => t.posX)) + 1) *
        (tileSize + Math.max(0, gap))
      }
    />
  );
};

const PawnCanvas = ({
  tiles,
  tileSize,
  gap
}: {
  gap: number;
  tileSize: number;
  tiles: Tile[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pawnsIndexed = useTileSelector(selectPawnIndex);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not get pawns canvas ref");
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get 2d context from pawn canvas");
      return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the number of pawns and arrange them in a square
    const allPawnIds = new Set<string>();
    for (const pawns of Object.values(pawnsIndexed)) {
      for (const pawn of pawns) {
        allPawnIds.add(pawn.tilePawnId);
      }
    }
    const numPawns = allPawnIds.size;
    const sqDimension = Math.ceil(Math.sqrt(numPawns));
    const radius = Math.floor(tileSize / (2 * sqDimension));

    // Draw each pawn
    tiles.forEach(({ posX: x, posY: y, tileId }) => {
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
        ctx.fillStyle = pawn.color;
        ctx.fill();
      }
    });
  }, [tiles, tileSize, gap, pawnsIndexed]);

  return (
    <canvas
      height={
        (Math.max(...tiles.map((t) => t.posY)) + 1) *
        (tileSize + Math.max(0, gap))
      }
      ref={canvasRef}
      style={{ left: 0, position: "absolute", top: 0 }}
      width={
        (Math.max(...tiles.map((t) => t.posX)) + 1) *
        (tileSize + Math.max(0, gap))
      }
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
      <TileCanvas gap={gap} tileSize={tileSize} tiles={tiles} />
      <PawnCanvas gap={gap} tileSize={tileSize} tiles={tiles} />
    </div>
  );
};
