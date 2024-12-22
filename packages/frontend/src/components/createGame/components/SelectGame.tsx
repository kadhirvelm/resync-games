import { Flex } from "@/lib/radix";
import { Text } from "@radix-ui/themes";
import { GameType } from "@resync-games/api";
import { GAME_REGISTRY } from "@resync-games/games-shared/gamesRegistry";
import clsx from "clsx";
import styles from "./SelectGame.module.scss";

export interface SelectedGame {
  gameType: GameType;
  version: string;
}

const SelectGame = ({
  selectedGame,
  onSelectGame
}: {
  onSelectGame: (selectedGame: SelectedGame) => void;
  selectedGame: SelectedGame | undefined;
}) => {
  return (
    <Flex gap="2" wrap="wrap">
      {Object.entries(GAME_REGISTRY).map(
        ([slug, { name, description, version }]) => (
          <Flex
            className={clsx(styles.selectGame, {
              [styles.active ?? ""]: slug === selectedGame?.gameType
            })}
            direction="column"
            key={slug}
            onClick={() =>
              onSelectGame({ gameType: slug as GameType, version })
            }
            p="3"
          >
            <Flex>
              <Text weight="bold">{name}</Text>
            </Flex>
            <Flex mt="2">
              <Text color="gray" size="2">
                {description}
              </Text>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
};

export default SelectGame;
