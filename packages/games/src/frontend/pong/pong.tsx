import { BaseScene } from "../phaser/baseScene";
import { BaseGame } from "../phaser/baseGame";
import { useEffect, useRef } from "react";
import { FrontendGameComponentProps } from "../frontendRegistry";
import { PongGameState } from "../../backend/pong/pong";
import { IGameStateHandler } from "@/redux";

/**
 * Simple single-paddle and ball game where the ball bounces around and you accumulate points by hitting the ball with the paddle.
 * The goal is to keep accumulating points. There is no win or lose condition.
 */
class PongGameScene extends BaseScene {
  private background: Phaser.GameObjects.Rectangle;
  private leftPaddle: Phaser.GameObjects.Rectangle;
  private rightPaddle: Phaser.GameObjects.Rectangle;

  private ball: Phaser.GameObjects.Rectangle;
  private leftScore: number = 0;
  private rightScore: number = 0;
  private scoreText: Phaser.GameObjects.Text;
  private keyboard: Phaser.Input.Keyboard.KeyboardPlugin;
  private isBallColliding: boolean = false; // Flag to track if the ball is colliding

  constructor(private store: IGameStateHandler<PongGameState>) {
    super("PongGameScene");

    // Make TS Happy
    this.background = {} as Phaser.GameObjects.Rectangle;
    this.leftPaddle = {} as Phaser.GameObjects.Rectangle;
    this.rightPaddle = {} as Phaser.GameObjects.Rectangle;
    this.ball = {} as Phaser.GameObjects.Rectangle;
    this.scoreText = {} as Phaser.GameObjects.Text;
    this.keyboard = {} as Phaser.Input.Keyboard.KeyboardPlugin;
  }

  create() {
    const state = this.getCurrentSyncedGameState();
    // Create background, paddle, and ball with origin set to (0, 0)
    this.background = this.add
      .rectangle(0, 0, 800, 600, 0x000000)
      .setOrigin(0, 0);
    this.leftPaddle = this.add
      .rectangle(state.leftPaddle.x, 250, 20, 100, 0xffffff)
      .setOrigin(0, 0);

    this.rightPaddle = this.add
      .rectangle(state.rightPaddle.x, 250, 20, 100, 0xffffff)
      .setOrigin(0, 0);
    this.ball = this.add
      .rectangle(state.ball.x, state.ball.y, 20, 20, 0xffffff)
      .setOrigin(0, 0);

    // Set ball's initial velocity
    this.ball.setData("velocityX", state.ball.velocityX);
    this.ball.setData("velocityY", state.ball.velocityY);

    if (!this.input.keyboard) {
      throw new Error("Keyboard input not found");
    }
    this.keyboard = this.input.keyboard;

    // Left Paddle (WASD)
    this.keyboard.on("keydown-W", () => {
      this.leftPaddle.y = Math.max(
        0,
        this.leftPaddle.y - 40 * this.getSpeedMultiplier()
      );
      this.syncGameState();
    });
    this.keyboard.on("keydown-S", () => {
      this.leftPaddle.y = Math.min(
        500,
        this.leftPaddle.y + 40 * this.getSpeedMultiplier()
      );
      this.syncGameState();
    });

    // Right Paddle (Arrow Keys)
    this.keyboard.on("keydown-UP", () => {
      this.rightPaddle.y = Math.max(
        0,
        this.rightPaddle.y - 40 * this.getSpeedMultiplier()
      );
      this.syncGameState();
    });
    this.keyboard.on("keydown-DOWN", () => {
      this.rightPaddle.y = Math.min(
        500,
        this.rightPaddle.y + 40 * this.getSpeedMultiplier()
      );
      this.syncGameState();
    });

    // Score display
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      color: "#FFFFFF",
      fontSize: "32px"
    });

    // Update loop for game logic
    this.physics.world.setBounds(0, 0, 800, 600);
    this.subscribeToGameStateChanges();
  }

  update() {
    // Ball movement
    const velocityX = this.ball.getData("velocityX");
    const velocityY = this.ball.getData("velocityY");
    this.ball.x += velocityX * 0.016;
    this.ball.y += velocityY * 0.016;

    // Ball collision with the top wall
    if (this.ball.y <= 0) {
      this.ball.setData("velocityY", Math.abs(velocityY)); // Reverse Y direction and go downward
    }

    // Ball collision with the bottom wall
    if (this.ball.y + this.ball.height >= 600) {
      this.ball.setData("velocityY", -Math.abs(velocityY)); // Reverse Y direction and go upward
    }

    // Ball collision with left paddle
    if (
      this.ball.x <= this.leftPaddle.x + this.leftPaddle.width &&
      this.ball.x >= this.leftPaddle.x &&
      this.ball.y + this.ball.height >= this.leftPaddle.y &&
      this.ball.y <= this.leftPaddle.y + this.leftPaddle.height
    ) {
      if (!this.isBallColliding) {
        this.ball.setData("velocityX", Math.abs(velocityX)); // Bounce right
        this.isBallColliding = true;
      }
    }

    // Ball collision with right paddle
    if (
      this.ball.x + this.ball.width >= this.rightPaddle.x &&
      this.ball.x + this.ball.width <=
        this.rightPaddle.x + this.rightPaddle.width &&
      this.ball.y + this.ball.height >= this.rightPaddle.y &&
      this.ball.y <= this.rightPaddle.y + this.rightPaddle.height
    ) {
      if (!this.isBallColliding) {
        this.ball.setData("velocityX", -Math.abs(velocityX)); // Bounce left
        this.isBallColliding = true;
      }
    } else {
      this.isBallColliding = false;
    }

    // If ball goes past the left paddle (right player scores)
    if (this.ball.x < 0) {
      this.rightScore += 1;
      this.resetBall("right");
      this.syncGameState();
    }

    // If ball goes past the right paddle (left player scores)
    if (this.ball.x > 800) {
      this.leftScore += 1;
      this.resetBall("left");
      this.syncGameState();
    }

    this.scoreText.setText(`Score: ${this.leftScore} - ${this.rightScore}`);
  }

  resetBall(scoringPlayer: "left" | "right") {
    this.ball.x = 390;
    this.ball.y = 290;

    // Ball moves toward the player who just lost the point
    const directionX = scoringPlayer === "left" ? -1 : 1;

    this.ball.setData(
      "velocityX",
      directionX * 100 * this.getSpeedMultiplier()
    );
    this.ball.setData("velocityY", Math.random() < 0.5 ? 150 : -150);
  }

  getSpeedMultiplier() {
    return 1 + 0.1 * Math.min(10, this.leftScore + this.rightScore + 1);
  }

  getCurrentSyncedGameState(): PongGameState {
    return this.store.getGameState();
  }

  setScoreText() {
    this.scoreText.setText(`Score: ${this.leftScore} - ${this.rightScore}`);
  }

  syncGameState() {
    this.store.updateGameState({
      ball: {
        velocityX: this.ball.getData("velocityX"),
        velocityY: this.ball.getData("velocityY"),
        x: this.ball.x,
        y: this.ball.y
      },
      lastUpdatedAt: new Date().toISOString(),
      leftPaddle: { x: this.leftPaddle.x, y: this.leftPaddle.y },
      leftScore: this.leftScore,
      rightPaddle: { x: this.rightPaddle.x, y: this.rightPaddle.y },
      rightScore: this.rightScore
    });
  }

  subscribeToGameStateChanges() {
    this.store.subscribeToGameStateUpdates((newState: PongGameState) => {
      // console.log(
      //   `Received an update: ${JSON.stringify(newState)} Current score: ${this.scoreText}`
      // );
      this.ball.setData("velocityX", newState.ball.velocityX);
      this.ball.setData("velocityY", newState.ball.velocityY);
      this.ball.x = newState.ball.x;
      this.ball.y = newState.ball.y;
      this.leftPaddle.x = newState.leftPaddle.x;
      this.leftPaddle.y = newState.leftPaddle.y;
      this.rightPaddle.x = newState.rightPaddle.x;
      this.rightPaddle.y = newState.rightPaddle.y;
      this.leftScore = newState.leftScore;
      this.rightScore = newState.rightScore;
      // Don't update the score text here, it will be updated in the update loop.
      // It seems to cause race conditions that result in null exceptions.
      // this.scoreText.setText("Score: " + this.score);
    });
  }
}

class PongGame extends BaseGame {
  constructor(store: IGameStateHandler<PongGameState>, parent: HTMLElement) {
    super(parent, [new PongGameScene(store)], { height: 600, width: 800 });
  }
}

const PongHomePage = ({ gameStateHandler }: FrontendGameComponentProps) => {
  const parentElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentElement.current == null) {
      return;
    }

    const game = new PongGame(
      gameStateHandler as IGameStateHandler<PongGameState>,
      parentElement.current
    );
    return () => {
      game.destroy();
    };
  }, []);

  return <div ref={parentElement} />;
};

export default PongHomePage;
