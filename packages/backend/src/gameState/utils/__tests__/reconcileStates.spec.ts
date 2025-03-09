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
});
