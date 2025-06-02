import { reconcileStates } from "../reconcileStates";

describe("reconcileStates", () => {
  it("top level test", () => {
    const previousState = {
      lastUpdatedAt: new Date("01/01/1990").toISOString(),
      valueA: "test-one"
    };
    const nextState = {
      lastUpdatedAt: new Date("01/01/1991").toISOString(),
      valueA: "test-two"
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "top-level"
    );

    expect(reconciledState).toEqual({
      didAcceptChange: true,
      newState: nextState
    });
  });

  it("closest test", () => {
    const previousState = {
      lastUpdatedAt: new Date("01/01/1990").toISOString(),
      someKeyA: {
        lastUpdatedAt: new Date("01/01/1992").toISOString(),
        valueA: "test-two"
      },
      someKeyB: {
        lastUpdatedAt: new Date("01/01/1992").toISOString(),
        valueB: "test-two"
      },
      someKeyC: {
        valueC: "test-two"
      }
    };
    const nextState = {
      lastUpdatedAt: new Date("01/01/1991").toISOString(),
      someKeyA: {
        lastUpdatedAt: new Date("01/01/1991").toISOString(),
        valueA: "test-three"
      },
      someKeyB: {
        lastUpdatedAt: new Date("01/01/1993").toISOString(),
        valueB: "test-three"
      },
      someKeyC: {
        lastUpdatedAt: new Date("01/01/1993").toISOString(),
        valueC: "test-three"
      }
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState).toEqual({
      didAcceptChange: true,
      newState: {
        lastUpdatedAt: new Date("01/01/1991").toISOString(),
        someKeyA: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          valueA: "test-two"
        },
        someKeyB: {
          lastUpdatedAt: new Date("01/01/1993").toISOString(),
          valueB: "test-three"
        },
        someKeyC: {
          lastUpdatedAt: new Date("01/01/1993").toISOString(),
          valueC: "test-three"
        }
      }
    });
  });

  it("closest more complex test", () => {
    const previousState = {
      lastUpdatedAt: new Date("01/01/1992").toISOString(),
      pawns: {
        pawnOne: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          onTile: "tile-two"
        },
        pawnThree: {
          onTile: "tile-two"
        },
        pawnTwo: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          onTile: "tile-two"
        }
      }
    };
    const nextState = {
      lastUpdatedAt: new Date("01/01/1993").toISOString(),
      pawns: {
        pawnOne: {
          lastUpdatedAt: new Date("01/01/1991").toISOString(),
          onTile: "tile-one"
        },
        pawnThree: {
          onTile: "tile-three"
        },
        pawnTwo: {
          lastUpdatedAt: new Date("01/01/1993").toISOString(),
          onTile: "tile-three"
        }
      }
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState).toEqual({
      didAcceptChange: true,
      newState: {
        lastUpdatedAt: new Date("01/01/1993").toISOString(),
        pawns: {
          pawnOne: {
            lastUpdatedAt: new Date("01/01/1992").toISOString(),
            onTile: "tile-two"
          },
          pawnThree: {
            onTile: "tile-three"
          },
          pawnTwo: {
            lastUpdatedAt: new Date("01/01/1993").toISOString(),
            onTile: "tile-three"
          }
        }
      }
    });
  });

  it("closest more complex test 2", () => {
    const previousState = {
      lastUpdatedAt: new Date("01/01/1992").toISOString(),
      pawns: {
        pawnOne: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          onTile: "tile-two",
          someState: {
            lastUpdatedAt: new Date("01/01/1992").toISOString(),
            someValue: "a"
          }
        },
        pawnThree: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          onTile: "tile-two",
          someState: {
            lastUpdatedAt: new Date("01/01/1992").toISOString(),
            someValue: "b"
          }
        },
        pawnTwo: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          onTile: "tile-two",
          someState: {
            lastUpdatedAt: new Date("01/01/1992").toISOString(),
            someValue: "b"
          }
        }
      }
    };
    const nextState = {
      lastUpdatedAt: new Date("01/01/1992").toISOString(),
      pawns: {
        pawnOne: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          onTile: "tile-two",
          someState: {
            lastUpdatedAt: new Date("01/01/1993").toISOString(),
            someValue: "b"
          }
        },
        pawnThree: {
          lastUpdatedAt: new Date("01/01/1991").toISOString(),
          onTile: "tile-one",
          someState: {
            lastUpdatedAt: new Date("01/01/1993").toISOString(),
            someValue: "c"
          }
        },
        pawnTwo: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          onTile: "tile-two",
          someState: {
            lastUpdatedAt: new Date("01/01/1991").toISOString(),
            someValue: "a"
          }
        }
      }
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState).toEqual({
      didAcceptChange: true,
      newState: {
        lastUpdatedAt: new Date("01/01/1992").toISOString(),
        pawns: {
          pawnOne: {
            lastUpdatedAt: new Date("01/01/1992").toISOString(),
            onTile: "tile-two",
            someState: {
              lastUpdatedAt: new Date("01/01/1993").toISOString(),
              someValue: "b"
            }
          },
          pawnThree: {
            lastUpdatedAt: new Date("01/01/1992").toISOString(),
            onTile: "tile-two",
            someState: {
              lastUpdatedAt: new Date("01/01/1993").toISOString(),
              someValue: "c"
            }
          },
          pawnTwo: {
            lastUpdatedAt: new Date("01/01/1992").toISOString(),
            onTile: "tile-two",
            someState: {
              lastUpdatedAt: new Date("01/01/1992").toISOString(),
              someValue: "b"
            }
          }
        }
      }
    });
  });

  it("basic pong state not working", () => {
    const previousState = {
      ball: { velocityX: 150, velocityY: -150, x: 390, y: 290 },
      lastUpdatedAt: "2025-03-09T21:08:05.746Z",
      paddle: { x: 350, y: 550 },
      score: 0
    };

    const nextState = {
      ball: {
        velocityX: 42,
        velocityY: 150,
        x: 580.1760000000072,
        y: 388.39999999999907
      },
      lastUpdatedAt: "2025-03-09T21:13:39.101Z",
      paddle: { x: 350, y: 550 },
      score: 1
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState).toEqual({
      didAcceptChange: true,
      newState: nextState
    });
  });

  it("nested edge case", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          lastUpdatedAt: "2025-05-13T04:18:06.435Z",
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-13T04:18:06.435Z",
            seedTime: 0,
            startTime: 0,
            state: "paused"
          }
        }
      }
    };

    const nextState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          lastUpdatedAt: "2025-05-13T04:18:06.435Z",
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-13T05:08:43.440Z",
            seedTime: 0,
            startTime: 1747112923440,
            state: "running"
          }
        }
      }
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState.didAcceptChange).toBe(true);
    expect(reconciledState.newState).toEqual({
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          lastUpdatedAt: "2025-05-13T04:18:06.435Z",
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-13T05:08:43.440Z",
            seedTime: 0,
            startTime: 1747112923440,
            state: "running"
          }
        }
      }
    });
  });

  it("nested edge case 2 - with some more updated and some less updated", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          lastUpdatedAt: "2025-05-13T04:18:06.435Z",
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-13T04:18:06.435Z",
            seedTime: 0,
            startTime: 0,
            state: "paused"
          },
          value: "a"
        }
      }
    };

    const nextState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          lastUpdatedAt: "2025-05-12T04:18:06.435Z",
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-14T05:08:43.440Z",
            seedTime: 0,
            startTime: 1747112923440,
            state: "running"
          },
          value: "b"
        }
      }
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState.didAcceptChange).toBe(true);
    expect(reconciledState.newState).toEqual({
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          lastUpdatedAt: "2025-05-13T04:18:06.435Z",
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-14T05:08:43.440Z",
            seedTime: 0,
            startTime: 1747112923440,
            state: "running"
          },
          value: "a"
        }
      }
    });
  });

  it("nested edge case 3 - with some missing and some less updated", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          lastUpdatedAt: "2025-05-13T04:18:06.435Z",
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-13T04:18:06.435Z",
            seedTime: 0,
            startTime: 0,
            state: "paused"
          },
          value: "a"
        }
      }
    };

    const nextState = {
      lastUpdatedAt: "2025-05-12T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-14T05:08:43.440Z",
            seedTime: 0,
            startTime: 1747112923440,
            state: "running"
          },
          value: "b"
        }
      }
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState.didAcceptChange).toBe(true);
    expect(reconciledState.newState).toEqual({
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      round: {
        currentActivePlayer: {
          lastUpdatedAt: "2025-05-13T04:18:06.435Z",
          timer: {
            countdownTimer: 45000,
            lastUpdatedAt: "2025-05-14T05:08:43.440Z",
            seedTime: 0,
            startTime: 1747112923440,
            state: "running"
          },
          value: "a"
        }
      }
    });
  });

  it("should prefer previousState when identical timestamps with nextState", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z"
    };
    const nextState = {
      extra: "new",
      lastUpdatedAt: "2025-05-13T04:17:33.020Z"
    };
    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );
    expect(reconciledState.newState).toEqual(previousState);
  });

  it("should handle arrays", () => {
    const previousState = {
      items: [1, 2, 3],
      lastUpdatedAt: "2025-05-13T04:17:33.020Z"
    };
    const nextState = {
      items: [4, 5, 6],
      lastUpdatedAt: "2025-05-14T04:17:33.020Z"
    };
    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );
    expect(reconciledState.newState).toEqual(nextState);
  });

  it("should handle null values correctly", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      value: null
    };
    const nextState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      value: "not-null"
    };
    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );
    expect(reconciledState.newState).toEqual(previousState);
  });

  it("should handle deeply nested objects with mixed updates", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      nested: {
        deep: {
          lastUpdatedAt: "2025-05-13T04:18:06.435Z",
          value: "deep-old"
        },
        lastUpdatedAt: "2025-05-13T04:18:06.435Z",
        value: "old"
      }
    };
    const nextState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      nested: {
        deep: {
          lastUpdatedAt: "2025-05-14T04:18:06.435Z",
          value: "deep-new"
        },
        lastUpdatedAt: "2025-05-13T04:18:06.435Z",
        value: "old"
      }
    };
    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );
    expect(reconciledState.newState).toEqual({
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      nested: {
        deep: {
          lastUpdatedAt: "2025-05-14T04:18:06.435Z",
          value: "deep-new"
        },
        lastUpdatedAt: "2025-05-13T04:18:06.435Z",
        value: "old"
      }
    });
  });

  it("should return previousState if both states are identical", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      value: "same"
    };
    const nextState = {
      lastUpdatedAt: "2025-05-13T04:17:33.020Z",
      value: "not-the-same"
    };
    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );
    expect(reconciledState.newState).toEqual(previousState);
  });

  it("should reconcile deeply nested objects", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13",
      "some-player-id-1": {
        "some-round-number-1": {
          lastUpdatedAt: "2025-05-13",
          value: "A"
        },
        "some-round-number-2": {
          lastUpdatedAt: "2025-05-13",
          value: "A"
        }
      },
      "some-player-id-2": {
        "some-round-number-1": {
          lastUpdatedAt: "2025-05-13",
          value: "B"
        },
        "some-round-number-2": {
          lastUpdatedAt: "2025-05-13",
          value: "B"
        }
      }
    };
    const nextState = {
      lastUpdatedAt: "2025-05-13",
      "some-player-id-1": {
        "some-round-number-1": {
          lastUpdatedAt: "2025-05-13",
          value: "A"
        },
        "some-round-number-2": {
          lastUpdatedAt: "2025-05-14",
          value: "B"
        }
      },
      "some-player-id-2": {
        "some-round-number-1": {
          lastUpdatedAt: "2025-05-13",
          value: "B"
        },
        "some-round-number-2": {
          lastUpdatedAt: "2025-05-13",
          value: "B"
        }
      }
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );
    expect(reconciledState.newState).toEqual(nextState);
  });

  it("should reconcile deeply nested objects with partial updates", () => {
    const previousState = {
      gameState: {
        playerGuesses: {
          "some-player-id-1": {
            "some-round-number-1": {
              lastUpdatedAt: "2025-05-13",
              value: "A"
            },
            "some-round-number-2": {
              lastUpdatedAt: "2025-05-13",
              value: "A"
            }
          },
          "some-player-id-2": {
            "some-round-number-1": {
              lastUpdatedAt: "2025-05-13",
              value: "B"
            },
            "some-round-number-2": {
              lastUpdatedAt: "2025-05-13",
              value: "B"
            }
          }
        }
      },
      lastUpdatedAt: "2025-05-13"
    };
    const nextState = {
      gameState: {
        playerGuesses: {
          "some-player-id-1": {
            "some-round-number-2": {
              lastUpdatedAt: "2025-05-14",
              value: "B"
            }
          }
        }
      },
      lastUpdatedAt: "2025-05-13"
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState.didAcceptChange).toBe(true);
    expect(reconciledState.newState).toEqual({
      gameState: {
        playerGuesses: {
          "some-player-id-1": {
            "some-round-number-1": {
              lastUpdatedAt: "2025-05-13",
              value: "A"
            },
            "some-round-number-2": {
              lastUpdatedAt: "2025-05-14",
              value: "B"
            }
          },
          "some-player-id-2": {
            "some-round-number-1": {
              lastUpdatedAt: "2025-05-13",
              value: "B"
            },
            "some-round-number-2": {
              lastUpdatedAt: "2025-05-13",
              value: "B"
            }
          }
        }
      },
      lastUpdatedAt: "2025-05-13"
    });
  });

  it("should reconcile deeply nested objects with partial updates, with new keys", () => {
    const previousState = {
      lastUpdatedAt: "2025-05-13",
      playerGuesses: {}
    };
    const nextState = {
      lastUpdatedAt: "2025-05-13",
      playerGuesses: {
        "some-player-id-1": {
          "some-round-number-1": {
            lastUpdatedAt: "2025-05-13",
            value: "A"
          }
        }
      }
    };

    const reconciledState = reconcileStates(
      previousState,
      nextState,
      "closest"
    );

    expect(reconciledState.didAcceptChange).toBe(true);
    expect(reconciledState.newState).toEqual({
      lastUpdatedAt: "2025-05-13",
      playerGuesses: {
        "some-player-id-1": {
          "some-round-number-1": {
            lastUpdatedAt: "2025-05-13",
            value: "A"
          }
        }
      }
    });
  });
});
