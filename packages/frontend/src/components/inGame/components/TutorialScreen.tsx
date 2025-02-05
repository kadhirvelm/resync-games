import { Flex, Button } from "@/lib/radix";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { useGameStateSelector } from "@/redux";
import { Dialog, Text } from "@radix-ui/themes";
import {
  GAME_REGISTRY,
  GAME_SLUGS
} from "@resync-games/games-shared/gamesRegistry";

export const TutorialScreen = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  if (gameInfo === undefined) {
    return;
  }

  const accordingGame = getFrontendGame(gameInfo.gameType);
  if (accordingGame.tutorialScreen === undefined) {
    return;
  }

  const gameSlug = gameInfo.gameType as (typeof GAME_SLUGS)[number];
  const accordingGameName = GAME_REGISTRY[gameSlug]?.name;

  return (
    <Flex direction="column" gap="2">
      <Text color="gray" size="2">
        {accordingGameName} tutorial
      </Text>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>How to play</Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="800px">
          <Dialog.Title>How to play</Dialog.Title>
          {accordingGame.tutorialScreen?.({
            gameConfiguration: gameInfo.gameConfiguration
          })}
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
};
