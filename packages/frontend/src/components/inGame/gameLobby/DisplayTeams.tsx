import { DisplayText } from "@/lib/radix";
import { Button } from "@/lib/radix/Button";
import { Flex } from "@/lib/radix/Flex";
import { DicesIcon } from "lucide-react";
import { DisplaySingleTeam } from "./DisplaySingleTeam";
import { isServiceError } from "../../../imports/api";
import { useGameStateSelector } from "../../../redux";
import { ClientServiceCallers } from "../../../services/serviceCallers";

export const DisplayTeams = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);

  const onShuffleTeams = async () => {
    if (gameInfo === undefined) {
      return;
    }

    const response = await ClientServiceCallers.gameState.shuffleTeams({
      gameId: gameInfo.gameId,
      gameType: gameInfo.gameType
    });

    if (!isServiceError(response)) {
      return;
    }

    console.error(response);
  };

  return (
    <Flex direction="column" flex="1" gap="6">
      <DisplaySingleTeam team={1} />
      <Flex flex="1" gap="2" justify="center" style={{ paddingLeft: "68px" }}>
        <DisplayText size="5" weight="bold">
          VS
        </DisplayText>
        <Flex>
          <Button onClick={onShuffleTeams} variant="outline">
            <DicesIcon />
          </Button>
        </Flex>
      </Flex>
      <DisplaySingleTeam team={2} />
    </Flex>
  );
};
