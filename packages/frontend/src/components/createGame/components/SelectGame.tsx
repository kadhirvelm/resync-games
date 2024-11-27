import { PlayerContext } from "@/components/player/PlayerContext";
import { Button } from "@/lib/radix/Button";
import { Flex } from "@/lib/radix/Flex";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { GameType, isServiceError } from "@resync-games/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { getDefaultConfiguration } from "../utils/getDefaultConfiguration";
import { GAME_REGISTRY } from "@resync-games/games-shared/gamesRegistry";

const SelectGame = () => {
  const router = useRouter();
  const player = useContext(PlayerContext);

  const onCreateGame = async (gameSlug: GameType, version: string) => {
    const accordingGame = getFrontendGame(gameSlug);

    const newGame = await ClientServiceCallers.gameState.createGame({
      gameConfiguration: getDefaultConfiguration(
        accordingGame.gameConfiguration
      ),
      gameName: `Example game ${gameSlug} ${new Date().toDateString()}-${new Date().toTimeString()}`,
      gameType: gameSlug,
      playerId: player.playerId,
      version
    });

    if (isServiceError(newGame)) {
      console.error(newGame);
      return;
    }

    router.push(`/${gameSlug}/${newGame.gameId}`);
  };

  return (
    <Flex direction="column" gap="2">
      {Object.entries(GAME_REGISTRY).map(([slug, { name, version }]) => (
        <Button
          key={slug}
          onClick={() => onCreateGame(slug as GameType, version)}
          style={{ padding: "5px" }}
        >
          {name}
        </Button>
      ))}
    </Flex>
  );
};

export default SelectGame;
