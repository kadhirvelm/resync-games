import React, { useEffect, useRef } from "react";
import { Tile } from "@tiles-tbd/api";
import { selectPawnIndex } from "@/stores/tiles/selectors/selectPawnState";
import { TileAppStore, useTileAppStore } from "@/stores/tiles/tilesStore";
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
  private pawnSprites: Record<string, Phaser.GameObjects.GameObject> = {};

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
    this.renderTiles();
    this.createAndRenderPawns();

    // Subscribe to changes
    this.store.subscribe(() => {
      this.movePawns();
    });
    return;
  }

  update() {
    return;
  }

  shutdown() {
    return;
  }

  renderTiles() {
    for (const tile of this.getTiles()) {
      const image = this.add.image(
        tile.posX * (this.tileSize + this.tileGap),
        tile.posY * (this.tileSize + this.tileGap),
        tile.image
      );
      image.setOrigin(0, 0);
      image.setDisplaySize(this.tileSize, this.tileSize);
    }
  }

  createAndRenderPawns() {
    // TODO: Clean up this gross mess
    const pawnsIndexed = selectPawnIndex(this.store.getState());
    const allPawnIds: Set<string> = new Set();
    for (const pawns of Object.values(pawnsIndexed)) {
      for (const pawn of pawns) {
        allPawnIds.add(pawn.tilePawnId);
      }
    }
    const numPawns = allPawnIds.size;

    const sqDimension = Math.ceil(Math.sqrt(numPawns));
    const radius = Math.floor(this.tileSize / (2 * sqDimension));

    for (const tile of this.getTiles()) {
      const pawnsOnThisTile = pawnsIndexed[tile.tileId] ?? [];
      const posX = tile.posX * (this.tileSize + this.tileGap);
      const posY = tile.posY * (this.tileSize + this.tileGap);

      for (let i = 0; i < pawnsOnThisTile.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const pawn = pawnsOnThisTile[i]!;
        const pawnPosX = posX + radius + 2 * radius * (i % sqDimension);
        const pawnPosY =
          posY + radius + 2 * radius * Math.floor(i / sqDimension);
        const pawnSprite = this.add.circle(
          pawnPosX,
          pawnPosY,
          this.tileSize / 8,
          parseInt(
            COLORS[pawn.color as keyof typeof COLORS].replaceAll("#", "0x"),
            16
          )
        );
        this.pawnSprites[pawn.tilePawnId] = pawnSprite;
      }
    }
  }

  movePawns() {
    // TODO: Clean up this gross mess
    const pawnsIndexed = selectPawnIndex(this.store.getState());
    const numPawns = Array.from(Object.values(pawnsIndexed)).length;
    const sqDimension = Math.ceil(Math.sqrt(numPawns));
    const radius = Math.floor(this.tileSize / (2 * sqDimension));
    for (const tile of this.getTiles()) {
      const pawnsOnThisTile = pawnsIndexed[tile.tileId] ?? [];
      const posX = tile.posX * (this.tileSize + this.tileGap);
      const posY = tile.posY * (this.tileSize + this.tileGap);

      for (let i = 0; i < pawnsOnThisTile.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const pawn = pawnsOnThisTile[i]!;
        const pawnPosX = posX + radius + 2 * radius * (i % sqDimension);
        const pawnPosY =
          posY + radius + 2 * radius * Math.floor(i / sqDimension);
        const pawnSprite = this.pawnSprites[pawn.tilePawnId];
        this.tweens.add({
          duration: 50,
          targets: pawnSprite,
          x: pawnPosX,
          y: pawnPosY
        });
      }
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
