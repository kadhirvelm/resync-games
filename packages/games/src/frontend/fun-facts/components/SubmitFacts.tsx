import { Button, Flex, TextField } from "@/lib/radix";
import { FunFactsGameConfiguration } from "../../../backend/fun-facts/funFacts";
import {
  updateFunFactsGameState,
  updateFunFactsLocalState,
  useFunFactsDispatch,
  useFunFactsSelector
} from "../store/funFactsRedux";
import {
  currentPlayerFactCountSelector,
  currentPlayerSubmissionsSelector,
  hasPlayerFinishedSubmittingSelector
} from "../store/funFactsSelectors";

export const SubmitFacts = () => {
  const dispatch = useFunFactsDispatch();
  const player = useFunFactsSelector((state) => state.playerSlice.player);
  const gameConfiguration = useFunFactsSelector(
    (state) => state.gameStateSlice.gameInfo?.gameConfiguration
  ) as FunFactsGameConfiguration | undefined;
  const currentFactInput = useFunFactsSelector(
    (state) => state.localStateSlice.localState?.currentFactInput
  );
  const submittedCount = useFunFactsSelector(currentPlayerFactCountSelector);
  const hasFinished = useFunFactsSelector(hasPlayerFinishedSubmittingSelector);
  const playerSubmissions = useFunFactsSelector(
    currentPlayerSubmissionsSelector
  );

  const factsRequired = gameConfiguration?.factsPerPlayer || 0;

  const handleInputChange = (value: string) => {
    dispatch(updateFunFactsLocalState({ currentFactInput: value }));
  };

  const handleSubmitFact = () => {
    if (!currentFactInput?.trim() || hasFinished || !player) return;

    const newFact = {
      fact: currentFactInput.trim(),
      submittedAt: new Date().toISOString(),
      submittedBy: player
    };

    const existingFacts = playerSubmissions?.facts || [];
    const updatedFacts = [...existingFacts, newFact];

    dispatch(
      updateFunFactsGameState(
        {
          allFacts: [newFact],
          lastUpdatedAt: new Date().toISOString(),
          // This will get reconciled with existing facts
          playerSubmissions: {
            [player.playerId]: {
              facts: updatedFacts,
              lastUpdatedAt: new Date().toISOString(),
              player
            }
          }
        },
        player
      )
    );

    // Clear the input
    dispatch(updateFunFactsLocalState({ currentFactInput: "" }));
  };

  if (hasFinished) {
    return (
      <Flex
        align="center"
        direction="column"
        gap="4"
        justify="center"
        style={{ padding: "2rem" }}
      >
        <h2>All facts submitted!</h2>
        <p>
          You've submitted all {factsRequired} fun facts. Waiting for other
          players...
        </p>
        <div style={{ marginTop: "1rem" }}>
          <h3>Your facts:</h3>
          {playerSubmissions?.facts.map((fact, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "0.5rem",
                padding: "0.5rem"
              }}
            >
              {fact.fact}
            </div>
          ))}
        </div>
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
      <h2>Submit Your Fun Facts</h2>
      <p>Submit {factsRequired} interesting facts about yourself!</p>
      <p>
        Progress: {submittedCount} / {factsRequired}
      </p>

      <Flex
        direction="column"
        gap="2"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <TextField
          onChange={handleInputChange}
          placeholder="Enter a fun fact about yourself..."
          value={currentFactInput ?? ""}
        />
        <Button disabled={!currentFactInput?.trim()} onClick={handleSubmitFact}>
          Submit Fact ({submittedCount + 1}/{factsRequired})
        </Button>
      </Flex>

      {submittedCount > 0 && (
        <div style={{ marginTop: "1rem", maxWidth: "500px", width: "100%" }}>
          <h3>Your submitted facts:</h3>
          {playerSubmissions?.facts.map((fact, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "0.5rem",
                padding: "0.5rem"
              }}
            >
              {fact.fact}
            </div>
          ))}
        </div>
      )}
    </Flex>
  );
};
