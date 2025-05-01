import { Button, Flex } from "@/lib/radix";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { useGameStateSelector } from "@/redux";
import { Dialog } from "@radix-ui/themes"; // TODO: migrate this

export const TutorialScreen = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  if (gameInfo === undefined) {
    return;
  }

  const accordingGame = getFrontendGame(gameInfo.gameType);
  if (accordingGame.tutorialScreen === undefined) {
    return;
  }

  return (
    <Flex direction="column">
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
