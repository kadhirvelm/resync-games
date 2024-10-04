/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tile } from "@resync-games/api";
import { useRef, useEffect } from "react";
import { BaseGame } from "../baseGame";
import { BaseScene } from "../baseScene";
import { IGameStateStore } from "../state";
import { SnatchTheSnackGame } from "../../backend";

const COLORS = {
  blue: "#2e86c1",
  green: "#1d8348",
  red: "#cb4335",
  yellow: "#f1c40f"
};

class MagicMazeScene extends BaseScene {
  private tileSize: number = 100;
  private tileGap: number = -15;
  private pawnSprites: Record<string, Phaser.GameObjects.GameObject> = {};

  constructor(private store: IGameStateStore<SnatchTheSnackGame>) {
    super("MagicMazeScene");
  }

  getTiles(): Tile[] {
    const state = this.store.getGameState();
    const tiles = state.tileMap.tiles;
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
    // this.store.subscribe(() => {
    //   this.movePawns();
    // });
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
    const pawnsIndexed = {} as any; // selectPawnIndex(this.store.getState());
    const allPawnIds: Set<string> = new Set();
    for (const pawns of Object.values(pawnsIndexed)) {
      for (const pawn of pawns as any) {
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
    const pawnsIndexed = {} as any; // selectPawnIndex(this.store.getState());
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

class MagicMazeGame extends BaseGame {
  constructor(store: IGameStateStore<SnatchTheSnackGame>, parent: HTMLElement) {
    super(parent, [new MagicMazeScene(store)], {
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
}

export const DisplayMagicMazeGame = (store: IGameStateStore<object>) => {
  const parentElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentElement.current == null) {
      return;
    }

    const game = new MagicMazeGame(
      store as IGameStateStore<SnatchTheSnackGame>,
      parentElement.current
    );
    return () => {
      game.destroy();
    };
  });

  return <div ref={parentElement} />;
};
