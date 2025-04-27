import { Flex } from "@/lib/radix";
import { Badge, Text } from "@radix-ui/themes";
import { GameType } from "@resync-games/api";
import {
  GAME_REGISTRY,
  RegisteredGame
} from "@resync-games/games-shared/gamesRegistry";
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
  const completedGames = Object.entries(GAME_REGISTRY)
    .filter((game) => game[1].gameTags.completed)
    .sort((a, b) => a[1].name.localeCompare(b[1].name));

  const inDevelopmentGames = Object.entries(GAME_REGISTRY)
    .filter((game) => !game[1].gameTags.completed)
    .sort((a, b) => a[1].name.localeCompare(b[1].name));

  const renderGame = (slug: string, game: RegisteredGame) => {
    const { gameTags, name, description, version } = game;
    return (
      <Flex
        className={clsx(styles.selectGame, {
          [styles.active ?? ""]: slug === selectedGame?.gameType
        })}
        direction="column"
        gap="2"
        key={slug}
        onClick={() => onSelectGame({ gameType: slug as GameType, version })}
        p="3"
      >
        <Flex>
          <Text weight="bold">{name}</Text>
        </Flex>
        <Flex align="start" flex="1" gap="3">
          <Flex flex="1">
            <Text color="gray" size="2">
              {description}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="end">
          {!gameTags.completed && <Badge color="red">development</Badge>}
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex direction="column" gap="4">
      <Flex gap="2" wrap="wrap">
        {completedGames.map(([slug, game]) => renderGame(slug, game))}
      </Flex>
      <Flex gap="2" wrap="wrap">
        {inDevelopmentGames.map(([slug, game]) => renderGame(slug, game))}
      </Flex>
    </Flex>
  );
};

export default SelectGame;
