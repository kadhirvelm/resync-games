import { Game } from "phaser";
import { BaseScene } from "./baseScene";

export class BaseGame {
  private game: Game;

  constructor(
    private parent: HTMLElement,
    private scenes: BaseScene[],
    resolution?: {
      height: number;
      width: number;
    }
  ) {
    this.game = new Game({
      backgroundColor: "#FFFFFF",
      // Set the height to be the same as the window height
      height: resolution?.height ?? window.innerHeight,
      parent: this.parent,
      scene: this.scenes,
      type: Phaser.AUTO,
      width: resolution?.width ?? window.innerWidth
    });
  }

  destroy() {
    this.game.destroy(true);
  }
}
