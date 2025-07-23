import { Flex } from "@/lib/radix/Flex";
import { useMediaQuery } from "../../lib/hooks/useMediaQuery";
import { GameConfigurationSideBar } from "./components/GameConfigurationSideBar";
import { GoHome } from "./components/GoHome";
import { DisplayGameCode } from "./gameLobby/DisplayGameCode";
import { DisplayTeamType } from "./gameLobby/DisplayTeamType";
import { StartGame } from "./gameLobby/StartGame";

export const GameLobby = () => {
  const { isMobile } = useMediaQuery();

  return (
    <Flex flex="1" py="9">
      <GoHome />
      <GameConfigurationSideBar />
      <Flex align="center" direction="column" flex="1">
        <Flex direction="column" width={isMobile ? "85vw" : "50vw"}>
          <Flex direction="column" gap="8">
            <DisplayGameCode />
            <DisplayTeamType />
          </Flex>
          <Flex align="center" flex="1" mb="5" minHeight="50px" mt="8">
            <StartGame />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
