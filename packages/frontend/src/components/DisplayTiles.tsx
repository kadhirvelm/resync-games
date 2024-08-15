import React, { RefObject, useEffect, useRef } from "react";
import { Tile } from "@tiles-tbd/api";

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
    tiles.forEach(({ posX: x, posY: y, image }) => {
      const img = new Image();
      img.src = `/images/${image}`;
      const posX = x * (tileSize + gap);
      const posY = y * (tileSize + gap);

      // Wait for image to load
      img.onload = () => {
        ctx.drawImage(img, posX, posY, tileSize, tileSize);
      };
    });
  }, [tiles, tileSize, gap]);

  for (const tile of tiles) {
    console.log(JSON.stringify(tile));
  }

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
