"use client";

import { Flex } from "@/lib/radix/Flex";
import { Text } from "@radix-ui/themes";
import { lazy, useContext } from "react";
import { PlayerContext } from "../player/PlayerContext";
import styles from "./CreateGame.module.scss";

const SelectGame = lazy(() => import("./components/SelectGame"));

export default function CreateGame() {
  const player = useContext(PlayerContext);

  return (
    <Flex className={styles.formBoxContainer} direction="column" gap="2">
      <Flex className={styles.formBox} direction="column" gap="5">
        <Text>Hi, {player.displayName}! Pick game to create</Text>
        <SelectGame />
      </Flex>
    </Flex>
  );
}
