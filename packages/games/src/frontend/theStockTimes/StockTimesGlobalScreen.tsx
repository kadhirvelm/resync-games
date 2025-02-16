import { Flex, Text } from "../components";
import { Clock } from "./components/cycle/Clock";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { EndGameGraph } from "./components/globalScreen/EndGameGraph";
import { useStockTimesSelector } from "./store/theStockTimesRedux";

export const StockTimesGlobalScreen = () => {
  const gameInfo = useStockTimesSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useStockTimesSelector((s) => s.gameStateSlice.gameState);

  if (gameState === undefined) {
    return;
  }

  if (gameState.cycle.state === "paused") {
    return (
      <Flex align="center" flex="1" justify="center">
        <Text color="gray">The game is paused</Text>
      </Flex>
    );
  }

  if (gameInfo?.currentGameState === "waiting") {
    return (
      <Flex align="center" flex="1" justify="center">
        <Text color="gray">Waiting for the game to start</Text>
      </Flex>
    );
  }

  if (gameInfo?.currentGameState === "finished") {
    return (
      <Flex flex="1">
        <EndGameGraph />
      </Flex>
    );
  }

  return (
    <Flex flex="1" gap="2">
      <Flex flex="1">
        <FinalScoreboard />
      </Flex>
      <Flex flex="1">
        <Clock cycle={gameState?.cycle} size={window.innerWidth / 2} />
      </Flex>
    </Flex>
  );
};
