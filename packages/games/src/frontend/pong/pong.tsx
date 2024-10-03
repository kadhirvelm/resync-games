import { BaseScene } from "../baseScene";
import { BaseGame } from "../baseGame";
import { useEffect, useRef } from "react";
/**
 * Simple single-paddle and ball game where the ball bounces around and you accumulate points by hitting the ball with the paddle.
 * The goal is to keep accumulating points. There is no win or lose condition.
 */
class PongGameScene extends BaseScene {
  private background: Phaser.GameObjects.Rectangle;
  private paddle: Phaser.GameObjects.Rectangle;
  private ball: Phaser.GameObjects.Rectangle;
  private score: number = 0;
  private scoreText: Phaser.GameObjects.Text;
  private keyboard: Phaser.Input.Keyboard.KeyboardPlugin;
  private isBallColliding: boolean = false; // Flag to track if the ball is colliding

  constructor() {
    super("PongGameScene");

    // Make TS Happy
    this.background = {} as Phaser.GameObjects.Rectangle;
    this.paddle = {} as Phaser.GameObjects.Rectangle;
    this.ball = {} as Phaser.GameObjects.Rectangle;
    this.scoreText = {} as Phaser.GameObjects.Text;
    this.keyboard = {} as Phaser.Input.Keyboard.KeyboardPlugin;
  }

  create() {
    // Create background, paddle, and ball with origin set to (0, 0)
    this.background = this.add
      .rectangle(0, 0, 800, 600, 0x000000)
      .setOrigin(0, 0);
    this.paddle = this.add
      .rectangle(350, 550, 100, 20, 0xffffff)
      .setOrigin(0, 0);
    this.ball = this.add.rectangle(390, 290, 20, 20, 0xffffff).setOrigin(0, 0);

    // Set ball's initial velocity
    this.ball.setData("velocityX", 150);
    this.ball.setData("velocityY", -150);

    if (!this.input.keyboard) {
      throw new Error("Keyboard input not found");
    }
    this.keyboard = this.input.keyboard;

    // Enable keyboard input to move paddle
    this.keyboard.on("keydown-LEFT", () => {
      this.paddle.x -= 20;
    });
    this.keyboard.on("keydown-RIGHT", () => {
      this.paddle.x += 20;
    });

    // Score display
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      color: "#FFFFFF",
      fontSize: "32px"
    });

    // Update loop for game logic
    this.physics.world.setBounds(0, 0, 800, 600);
  }

  update() {
    // Ball movement
    const velocityX = this.ball.getData("velocityX");
    const velocityY = this.ball.getData("velocityY");
    this.ball.x += velocityX * 0.016;
    this.ball.y += velocityY * 0.016;

    // Ball collision with the walls
    if (this.ball.x <= 0 || this.ball.x + this.ball.width >= 800) {
      this.ball.setData("velocityX", -velocityX); // Reverse X direction
    }
    if (this.ball.y <= 0) {
      this.ball.setData("velocityY", -velocityY); // Reverse Y direction
    }

    // Ball collision with paddle
    if (
      this.ball.y + this.ball.height >= 550 &&
      this.ball.x + this.ball.width >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width
    ) {
      if (!this.isBallColliding) {
        this.ball.setData("velocityY", -velocityY); // Bounce off paddle
        this.incrementScore();
        this.isBallColliding = true;
      }
    } else {
      this.isBallColliding = false;
    }

    // Reset ball if it goes off-screen (bottom)
    if (this.ball.y > 600) {
      this.resetBall();
    }
  }

  // Helper function to reset the ball
  resetBall() {
    this.ball.x = 390;
    this.ball.y = 290;
    this.ball.setData("velocityX", Phaser.Math.Between(-150, 150));
    this.ball.setData("velocityY", -150);
  }

  // Helper function to increment the score
  incrementScore() {
    this.score += 1;
    this.scoreText.setText("Score: " + this.score);
  }
}

class PongGame extends BaseGame {
  constructor(parent: HTMLElement) {
    super(parent, [new PongGameScene()], { height: 600, width: 800 });
  }
}

export const PongHomePage = () => {
  const parentElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentElement.current == null) {
      return;
    }

    const game = new PongGame(parentElement.current);
    return () => {
      game.destroy();
    };
  });

  return <div ref={parentElement} />;
};
