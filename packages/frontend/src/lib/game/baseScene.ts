import { Scene as PhaserScene } from "phaser";

export class BaseScene extends PhaserScene {
  constructor(private sceneName: string) {
    super();
  }
}
