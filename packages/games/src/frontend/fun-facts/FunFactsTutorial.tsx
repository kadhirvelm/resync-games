import { Flex } from "@/lib/radix";
import { FunFactsGameConfiguration } from "../../backend/fun-facts/funFacts";

export const FunFactsTutorial = ({
  gameConfiguration
}: {
  gameConfiguration: object;
}) => {
  const factsPerPlayer =
    (gameConfiguration as FunFactsGameConfiguration).factsPerPlayer || 3;

  return (
    <Flex
      direction="column"
      gap="4"
      style={{ margin: "0 auto", maxWidth: "800px", padding: "2rem" }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          textAlign: "center"
        }}
      >
        How to Play Fun Facts
      </h1>

      <div style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        <h2 style={{ color: "#4a90e2", marginBottom: "1rem" }}>
          Game Overview
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          Fun Facts is a simple social game where players share interesting
          facts about themselves with the group. It's perfect for getting to
          know each other better!
        </p>

        <h2 style={{ color: "#4a90e2", marginBottom: "1rem" }}>How to Play</h2>
        <ol style={{ marginBottom: "1rem", paddingLeft: "1.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            Each player submits <strong>{factsPerPlayer} fun facts</strong>{" "}
            about themselves
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Facts should be interesting, true, and appropriate for the group
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Once everyone has submitted their facts, all facts are displayed for
            everyone to read
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Take time to read and enjoy learning about each other!
          </li>
        </ol>

        <h2 style={{ color: "#4a90e2", marginBottom: "1rem" }}>
          Tips for Good Fun Facts
        </h2>
        <ul style={{ marginBottom: "1rem", paddingLeft: "1.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            Share something unique or surprising about yourself
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Include interesting hobbies, experiences, or talents
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Keep facts appropriate for your group
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Be creative and have fun with it!
          </li>
        </ul>

        <h2 style={{ color: "#4a90e2", marginBottom: "1rem" }}>
          Example Fun Facts
        </h2>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "1rem"
          }}
        >
          <ul style={{ paddingLeft: "1.5rem" }}>
            <li>"I once ate a tarantula in Cambodia"</li>
            <li>"I can play the ukulele with my toes"</li>
            <li>"I've visited all 50 U.S. states"</li>
            <li>"I used to be afraid of butterflies"</li>
          </ul>
        </div>
      </div>
    </Flex>
  );
};
