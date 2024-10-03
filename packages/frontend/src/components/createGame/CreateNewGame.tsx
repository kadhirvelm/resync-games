"use client";

import { Select } from "@/lib/radix/Select";
import { TextField } from "@/lib/radix/TextField";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { Slider, Text } from "@radix-ui/themes";
import {
  CreateTileGameRequest,
  GameType,
  isServiceError,
  PlayerId,
  TileMap
} from "@resync-games/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./CreateNewGame.module.scss";
import { Button } from "@/lib/radix/Button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Flex } from "@/lib/radix/Flex";

const isCompleteGame = (
  game: Partial<CreateTileGameRequest>
): game is CreateTileGameRequest => {
  return (
    game.name !== undefined &&
    game.tileMapId !== undefined &&
    game.numberOfPawns !== undefined
  );
};

export function CreateNewGame({ tileMaps }: { tileMaps: TileMap[] }) {
  const router = useRouter();

  const [newGame, setNewGame] = useState<Partial<CreateTileGameRequest>>({
    name: undefined,
    numberOfPawns: 4,
    tileMapId: undefined
  });
  const [isCreatingMap, setIsCreatingMap] = useState(false);
  const [isCreatingGame, setIsCreatingGame] = useState(false);

  const setNewGameCurried =
    (key: keyof CreateTileGameRequest) =>
    (value: CreateTileGameRequest[typeof key]) => {
      setNewGame({ ...newGame, [key]: value });
    };

  const generateTileMap = async () => {
    setIsCreatingMap(true);
    const maybeTileMapIdResponse =
      await ClientServiceCallers.snatchTheSnackMaps.generateTileMap({
        generatorName: "magicMazeSimple"
      });
    setIsCreatingMap(false);

    if (isServiceError(maybeTileMapIdResponse)) {
      return;
    }

    setNewGameCurried("tileMapId")(maybeTileMapIdResponse.tileMapId);
  };

  const createNewGame = async () => {
    if (!isCompleteGame(newGame)) {
      return;
    }

    setIsCreatingGame(true);
    const maybeNewGame = await ClientServiceCallers.gameState.createGame({
      gameConfiguration: {
        numberOfPawns: newGame.numberOfPawns,
        tileMapId: newGame.tileMapId
      },
      gameName: newGame.name,
      gameType: "snatchTheSnack" as GameType,
      // TODO: enable setting the player
      playerId: "player1" as PlayerId,
      version: "1.0.0"
    });

    if (isServiceError(maybeNewGame)) {
      setIsCreatingGame(false);
      return;
    }

    router.push(`/snatch-the-snack/${maybeNewGame.gameId}`);
  };

  const onNumberOfPawnsChange = ([numberOfPawns]: [number]) =>
    setNewGameCurried("numberOfPawns")(numberOfPawns);

  const randomlySelectMap = () => {
    const randomMap = tileMaps[Math.floor(Math.random() * tileMaps.length)];
    if (randomMap === undefined) {
      return;
    }

    setNewGameCurried("tileMapId")(randomMap.tileMapId);
  };

  return (
    <Flex className={styles.formBoxContainer} direction="column" gap="2">
      <Flex className={styles.formBox} direction="column" gap="5">
        <Flex direction="column" gap="2">
          <Text color="gray" size="2">
            1. Game name
          </Text>
          <TextField
            onChange={setNewGameCurried("name")}
            placeholder="What players will see..."
            value={newGame.name ?? ""}
          />
        </Flex>
        <Flex direction="column" gap="2">
          <Text color="gray" size="2">
            2. Total pawns - {newGame.numberOfPawns ?? 0}
          </Text>
          <Slider
            max={6}
            min={1}
            onValueChange={onNumberOfPawnsChange}
            value={[newGame.numberOfPawns ?? 0]}
          />
        </Flex>
        <Flex direction="column" gap="2">
          <Text color="gray" size="2">
            3. Map
          </Text>
          <Flex align="center" gap="2">
            <Flex flex="2">
              <Select
                items={tileMaps.map((map) => ({
                  label: map.tileMapId,
                  value: map.tileMapId
                }))}
                onChange={setNewGameCurried("tileMapId")}
                value={newGame.tileMapId ?? "No map selected"}
              />
            </Flex>
            <Flex flex="1" gap="1">
              <Button
                disabled={tileMaps.length === 0}
                onClick={randomlySelectMap}
                variant="outline"
              >
                <SymbolIcon />
              </Button>
              <Button
                loading={isCreatingMap}
                onClick={generateTileMap}
                variant="soft"
              >
                New map
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexGrow="1" mt="3">
          <Button
            disabled={!isCompleteGame(newGame)}
            loading={isCreatingGame}
            onClick={createNewGame}
          >
            Create
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
