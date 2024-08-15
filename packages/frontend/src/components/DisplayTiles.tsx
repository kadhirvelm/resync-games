import React, { RefObject, useEffect, useRef } from "react";
import { Tile } from "@tiles-tbd/api";
import { selectPawnIndex } from "@/stores/tiles/selectPawnState";
import { useTileSelector } from "@/stores/tiles/tilesStore";

export const DisplayTiles = ({
  tiles,
  tileSize = 100,
  gap = -15
}: {
  gap?: number;
  tileSize?: number;
  tiles: Tile[];
}) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const pawnsIndexed = useTileSelector(selectPawnIndex);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      console.error("Could not get canvas ref");
      return;
    }
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      console.error("Could not get 2d context from canvas");
      return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each tile
    tiles.forEach(({ posX: x, posY: y, image, tileId }) => {
      const pawnsOnThisTile = pawnsIndexed[tileId] ?? [];
      const img = new Image();
      img.src = `/images/${image}`;
      const posX = x * (tileSize + gap);
      const posY = y * (tileSize + gap);

      // Wait for image to load
      img.onload = () => {
        ctx.drawImage(img, posX, posY, tileSize, tileSize);
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
      };
    });
  });

  return (
    <canvas
      height={
        (Math.max(...tiles.map((t) => t.posY)) + 1) *
        (tileSize + Math.max(0, gap))
      }
      ref={canvasRef}
      width={
        (Math.max(...tiles.map((t) => t.posX)) + 1) *
        (tileSize + Math.max(0, gap))
      }
    />
  );
};
