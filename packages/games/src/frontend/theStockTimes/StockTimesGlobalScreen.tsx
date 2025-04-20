import { useRef } from "react";
import { Flex, Text } from "../components";
import { Clock } from "./components/cycle/Clock";
import { FinalScoreboard } from "./components/FinalScoreboard";
import { EndGameGraph } from "./components/globalScreen/EndGameGraph";
import { FocusedStock } from "./components/singleStock/FocusedStock";
import { useStockTimesSelector } from "./store/theStockTimesRedux";
import { DisplayType } from "./utils/DisplayType";

export const StockTimesGlobalScreen = () => {
  const clockRef = useRef<HTMLDivElement>(null);

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
      <Flex align="center" direction="column" flex="1" justify="center">
        <Flex>
          <Text color="gray">Waiting for the game to start</Text>
        </Flex>
        <Flex align="center" gap="2">
          <Text size="9" weight="bold">
            {gameInfo.inviteCode.toUpperCase()}
          </Text>
        </Flex>
      </Flex>
    );
  }

  if (gameInfo?.currentGameState === "finished") {
    return (
      <Flex flex="1" gap="2">
        <Flex align="center" flex="1">
          <FinalScoreboard />
        </Flex>
        <Flex flex="2">
          <EndGameGraph />
        </Flex>
      </Flex>
    );
  }

  return (
    <DisplayType.Provider value={{ displayType: "global-screen" }}>
      <Flex flex="1">
        <Flex direction="column" flex="1" gap="3" p="3">
          <Flex align="center" flex="1" justify="center" ref={clockRef}>
            <Clock
              cycle={gameState?.cycle}
              size={(clockRef.current?.clientWidth ?? 100) - 20}
            />
          </Flex>
          <Flex flex="1">
            <FinalScoreboard />
          </Flex>
        </Flex>
        <Flex flex="2" p="3">
          <FocusedStock />
        </Flex>
      </Flex>
    </DisplayType.Provider>
  );
};
