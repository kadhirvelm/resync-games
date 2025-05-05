import { useRef } from "react";
import { Flex, DisplayText } from "@/lib/radix";
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
        <DisplayText color="gray">The game is paused</DisplayText>
      </Flex>
    );
  }

  if (gameInfo?.currentGameState === "waiting") {
    return (
      <Flex align="center" direction="column" flex="1" justify="center">
        <Flex>
          <DisplayText color="gray">Waiting for the game to start</DisplayText>
        </Flex>
        <Flex align="center" gap="2">
          <DisplayText size="9" weight="bold">
            {gameInfo.inviteCode.toUpperCase()}
          </DisplayText>
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

  const clockSize = Math.min(
    clockRef.current?.clientWidth ?? 100,
    clockRef.current?.clientHeight ?? 100
  );

  return (
    <DisplayType.Provider value={{ displayType: "global-screen" }}>
      <Flex flex="1">
        <Flex direction="column" flex="1" gap="5" p="3">
          <Flex align="center" flex="2" justify="center" ref={clockRef}>
            <Clock cycle={gameState?.cycle} size={clockSize - 20} />
          </Flex>
          <Flex align="center" flex="1">
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
