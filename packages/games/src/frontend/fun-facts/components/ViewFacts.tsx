import { Flex } from "@/lib/radix";
import { useFunFactsSelector } from "../store/funFactsRedux";
import { allFactsSelector } from "../store/funFactsSelectors";

export const ViewFacts = () => {
  const allFacts = useFunFactsSelector(allFactsSelector);

  if (allFacts.length === 0) {
    return (
      <Flex
        align="center"
        direction="column"
        gap="4"
        justify="center"
        style={{ padding: "2rem" }}
      >
        <h2>No facts submitted yet!</h2>
        <p>Waiting for players to submit their fun facts...</p>
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      direction="column"
      gap="4"
      justify="center"
      style={{ padding: "2rem" }}
    >
      <h2>Fun Facts from Everyone!</h2>
      <p>Here are all the fun facts submitted by players:</p>

      <div style={{ maxWidth: "800px", width: "100%" }}>
        {allFacts.map((fact, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "1rem",
              padding: "1rem"
            }}
          >
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              "{fact.fact}"
            </p>
            <p
              style={{ color: "#666", fontSize: "0.9rem", fontStyle: "italic" }}
            >
              - {fact.submittedBy.displayName}
            </p>
          </div>
        ))}
      </div>
    </Flex>
  );
};
