import {
  IGameStateHandler,
  updateLocalState,
  useGameStateDispatch
} from "@/redux";
import { Tile } from "@/imports/api";
import { useEffect, useRef } from "react";
import { SnatchTheSnackGame } from "../../backend/snatch-the-snack/snatchTheSnack";
import { FrontendGameComponentProps } from "../frontendRegistry";
import { BaseGame } from "../phaser/baseGame";
import { BaseScene } from "../phaser/baseScene";
import { PawnMovement } from "./components/PawnMovement";
import { SelectPawn } from "./components/SelectPawn";
import { SnatchTheSnackLocalState } from "./store/snatchTheSnackLocalState";
import { indexPawns } from "./utils/indexPawns";

const COLORS = {
  blue: "#2e86c1",
  green: "#1d8348",
  red: "#cb4335",
  yellow: "#f1c40f"
};

class MagicMazeScene extends BaseScene {
  private tileSize: number = 100;
  private tileGap: number = -16;
  private pawnSprites: Record<string, Phaser.GameObjects.GameObject> = {};

  constructor(private store: IGameStateHandler<SnatchTheSnackGame>) {
    super("MagicMazeScene");
  }

  private getTiles = (): Tile[] => {
    const state = this.store.getGameState();
    const tiles = state.tileMap.tiles;
    if (!tiles) {
      return [];
    }

    return tiles;
  };

  public preload = () => {
    for (const tile of this.getTiles()) {
      this.load.image(tile.image, `/images/${tile.image}`);
    }
  };

  public create = () => {
    this.renderTiles();
    this.createAndRenderPawns();

    // Subscribe to changes
    this.store.subscribeToGameStateUpdates(() => {
      this.movePawns();
    });

    return;
  };

  public renderTiles = () => {
    for (const tile of this.getTiles()) {
      const image = this.add.image(
        tile.posX * (this.tileSize + this.tileGap),
        tile.posY * (this.tileSize + this.tileGap),
        tile.image
      );
      image.setOrigin(0, 0);
      image.setDisplaySize(this.tileSize - 1, this.tileSize - 1);
    }
  };

  public createAndRenderPawns = () => {
    const pawnsIndexed = indexPawns(this.store.getGameState().pawns);

    const numPawns = Object.values(this.store.getGameState().pawns).length;

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
        this.pawnSprites[pawn.pawnId] = pawnSprite;
      }
    }
  };

  movePawns() {
    const pawnsIndexed = indexPawns(this.store.getGameState().pawns);

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
        const pawnSprite = this.pawnSprites[pawn.pawnId];

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
  constructor(
    store: IGameStateHandler<SnatchTheSnackGame>,
    parent: HTMLElement
  ) {
    super(parent, [new MagicMazeScene(store)], {
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
}

export const SnatchTheSnack = ({
  gameStateHandler
}: FrontendGameComponentProps) => {
  const dispatch = useGameStateDispatch();

  const parentElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(updateLocalState({ selectedPawn: undefined }));
  }, []);

  useEffect(() => {
    if (parentElement.current == null) {
      return;
    }

    const game = new MagicMazeGame(
      gameStateHandler as IGameStateHandler<
        SnatchTheSnackGame,
        SnatchTheSnackLocalState
      >,
      parentElement.current
    );

    return () => {
      game.destroy();
    };
  }, []);

  return (
    <>
      <div ref={parentElement} />
      <PawnMovement />
      <SelectPawn />
    </>
  );
};
