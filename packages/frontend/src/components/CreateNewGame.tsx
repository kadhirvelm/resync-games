"use client";

import { ClientServiceCallers } from "@/services/serviceCallers";
import { CreateTileGameRequest, isServiceError, TileMap } from "@tiles-tbd/api";
import {
  Box,
  Button,
  Form,
  FormField,
  RangeInput,
  Select,
  Text,
  TextInput
} from "grommet";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./CreateNewGame.module.scss";

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
  const [value, setValue] = useState<Partial<CreateTileGameRequest>>({
    name: undefined,
    numberOfPawns: 4,
    tileMapId: undefined
  });

  const createNewGame = async () => {
    if (!isCompleteGame(value)) {
      return;
    }

    const maybeNewGame = await ClientServiceCallers.tileGame.createGame(value);
    if (isServiceError(maybeNewGame)) {
      return;
    }

    router.push(`/tile-game/${maybeNewGame.game.tileGameId}`);
  };

  return (
    <Box>
      <Form onChange={setValue} onSubmit={createNewGame} value={value}>
        <Box
          className={styles.formBox}
          gap="40px"
          style={{ maxWidth: "500px" }}
        >
          <FormField label="Game name" name="name">
            <TextInput name="name" placeholder="What players will see..." />
          </FormField>
          <Box align="flex-end" direction="row">
            <Box flex="grow">
              <FormField label="Number of pawns" name="numberOfPawns">
                <RangeInput max={8} min={1} name="numberOfPawns" />
              </FormField>
            </Box>
            <Box margin="0 15px 15px">
              <Text size="25px">{value["numberOfPawns"]}</Text>
            </Box>
          </Box>
          <FormField label="Tile map" name="tileMapId">
            <Select
              name="tileMapId"
              options={tileMaps.map((map) => map.tileMapId)}
            />
          </FormField>
          <Box direction="row" flex="grow" margin="20px">
            <Button label="Submit" primary style={{ flex: 1 }} type="submit" />
          </Box>
        </Box>
      </Form>
    </Box>
  );
}
