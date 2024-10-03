import { Game } from "phaser";
import { BaseScene } from "./baseScene";

export class BaseGame {
  private game: Game;

  constructor(
    private parent: HTMLElement,
    private scenes: BaseScene[],
    resolution: {
      height: number;
      width: number;
    }
  ) {
    this.game = new Game({
      backgroundColor: "#FFFFFF",
      // Set the height to be the same as the window height
      height: resolution.height,
      parent: this.parent,
      physics: {
        arcade: {
          debug: false,
          gravity: { x: 0, y: 0 }
        },
        default: "arcade"
      },
      scene: this.scenes,
      type: Phaser.AUTO,
      width: resolution.width
    });
  }

  destroy() {
    this.game.destroy(true);
  }
}
