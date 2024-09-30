import { Game } from "phaser";
import { BaseScene } from "./baseScene";

export class BaseGame {
  private game: Game;

  constructor(
    private parent: HTMLCanvasElement,
    private scenes: BaseScene[],
    private resolution: {
      height: number;
      width: number;
    }
  ) {
    this.game = new Game({
      backgroundColor: "#000",
      height: this.resolution.height,
      parent: this.parent,
      scene: this.scenes,
      type: Phaser.AUTO,
      width: this.resolution.width
    });
  }

  destroy() {
    this.game.destroy(true);
  }
}
