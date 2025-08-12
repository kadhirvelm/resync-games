import { Flex } from "@/lib/radix";
import { FunFactsGameConfiguration } from "../../backend/fun-facts/funFacts";
import { useFunFactsSelector } from "./store/funFactsRedux";
import {
  allFactsSelector,
  currentPhaseSelector
} from "./store/funFactsSelectors";

export const FunFactsGlobalScreen = () => {
  const phase = useFunFactsSelector(currentPhaseSelector);
  const allFacts = useFunFactsSelector(allFactsSelector);
  const players = useFunFactsSelector(
    (state) => state.gameStateSlice.gameInfo?.players
  );
  const gameConfiguration = useFunFactsSelector(
    (state) => state.gameStateSlice.gameInfo?.gameConfiguration
  ) as FunFactsGameConfiguration | undefined;

  const totalFactsExpected =
    (players?.length ?? 0) * (gameConfiguration?.factsPerPlayer || 0);
  const currentFactsSubmitted = allFacts.length;

  if (phase === "collecting-facts") {
    return (
      <Flex
        align="center"
        direction="column"
        gap="4"
        justify="center"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Submit Fun Facts!
        </h1>
        <h2>Players are submitting their fun facts...</h2>
        <div
          style={{
            backgroundColor: "#f0f8ff",
            borderRadius: "8px",
            fontSize: "1.5rem",
            padding: "1rem"
          }}
        >
          Progress: {currentFactsSubmitted} / {totalFactsExpected} facts
          submitted
        </div>
        <p style={{ fontSize: "1.1rem" }}>
          Each player needs to submit {gameConfiguration?.factsPerPlayer}{" "}
          interesting facts about themselves
        </p>
      </Flex>
    );
  }

  if (phase === "viewing-facts") {
    return (
      <Flex
        align="center"
        direction="column"
        gap="4"
        justify="center"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Everyone's Fun Facts!
        </h1>

        {allFacts.length === 0 ? (
          <p>No facts have been submitted yet!</p>
        ) : (
          <div style={{ maxWidth: "1200px", width: "100%" }}>
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
              }}
            >
              {allFacts.map((fact, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "2px solid #4a90e2",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    padding: "1.5rem",
                    textAlign: "left"
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.2rem",
                      lineHeight: "1.4",
                      marginBottom: "1rem"
                    }}
                  >
                    "{fact.fact}"
                  </p>
                  <p
                    style={{
                      borderTop: "1px solid #eee",
                      color: "#666",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      paddingTop: "0.5rem"
                    }}
                  >
                    — {fact.submittedBy.displayName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Flex>
    );
  }

  return null;
};
