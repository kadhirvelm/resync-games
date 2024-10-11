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
        lastUpdatedAt: new Date("01/01/1990").toISOString(),
        someKeyA: {
          lastUpdatedAt: new Date("01/01/1992").toISOString(),
          valueA: "test-two"
        },
        someKeyB: {
          lastUpdatedAt: new Date("01/01/1993").toISOString(),
          valueB: "test-three"
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
        lastUpdatedAt: new Date("01/01/1992").toISOString(),
        pawns: {
          pawnOne: {
            lastUpdatedAt: new Date("01/01/1992").toISOString(),
            onTile: "tile-two"
          },
          pawnTwo: {
            lastUpdatedAt: new Date("01/01/1993").toISOString(),
            onTile: "tile-three"
          }
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
});
