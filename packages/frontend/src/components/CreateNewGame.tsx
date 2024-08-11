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
      <Form value={value} onChange={setValue} onSubmit={createNewGame}>
        <Box
          className={styles.formBox}
          gap="40px"
          style={{ maxWidth: "500px" }}
        >
          <FormField name="name" label="Game name">
            <TextInput name="name" placeholder="What players will see..." />
          </FormField>
          <Box direction="row" align="flex-end">
            <Box flex="grow">
              <FormField name="numberOfPawns" label="Number of pawns">
                <RangeInput name="numberOfPawns" min={1} max={8} />
              </FormField>
            </Box>
            <Box margin="0 15px 15px">
              <Text size="25px">{value["numberOfPawns"]}</Text>
            </Box>
          </Box>
          <FormField name="tileMapId" label="Tile map">
            <Select
              name="tileMapId"
              options={tileMaps.map((map) => map.tileMapId)}
            />
          </FormField>
          <Box direction="row" flex="grow" margin="20px">
            <Button type="submit" style={{ flex: 1 }} primary label="Submit" />
          </Box>
        </Box>
      </Form>
    </Box>
  );
}
