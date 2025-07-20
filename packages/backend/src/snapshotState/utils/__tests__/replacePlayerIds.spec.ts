import { describe, it } from "@jest/globals";
import { replacePlayers } from "../replacePlayerIds";
import { PlayerId } from "../../../imports/api";

describe("replacePlayerIds", () => {
  it("should replace player ids in the game state", () => {
    const gameState = {
      players: [
        { id: "1000", name: "Player 1" },
        { id: "2000", name: "Player 2" }
      ]
    };

    const idMapping = new Map<PlayerId, PlayerId>([
      ["1000" as PlayerId, "3000" as PlayerId],
      ["2000" as PlayerId, "4000" as PlayerId]
    ]);

    const updatedGameState = replacePlayers(gameState, idMapping);

    expect(updatedGameState).toEqual({
      players: [
        { id: "3000", name: "Player 1" },
        { id: "4000", name: "Player 2" }
      ]
    });
  });

  it("should replace player ids in the game state", () => {
    const gameState = {
      players: {
        "1000": { id: "1000", name: "Player 1" },
        "2000": { id: "2000", name: "Player 2" }
      }
    };

    const idMapping = new Map<PlayerId, PlayerId>([
      ["1000" as PlayerId, "3000" as PlayerId],
      ["2000" as PlayerId, "4000" as PlayerId]
    ]);

    const updatedGameState = replacePlayers(gameState, idMapping);

    expect(updatedGameState).toEqual({
      players: {
        "3000": { id: "3000", name: "Player 1" },
        "4000": { id: "4000", name: "Player 2" }
      }
    });
  });
});
