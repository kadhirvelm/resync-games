import { Flex } from "@/lib/radix/Flex";
import { capitalize } from "lodash-es";
import { Text } from "@radix-ui/themes";
import styles from "./GameState.module.scss";
import clsx from "clsx";

export const GameState = ({ state }: { state: string }) => {
  return (
    <Flex
      className={clsx({
        [styles.waiting ?? ""]: state === "waiting",
        [styles.playing ?? ""]: state === "playing",
        [styles.finished ?? ""]: state === "finished"
      })}
      px="2"
      py="1"
    >
      <Text size="1">{capitalize(state)}</Text>
    </Flex>
  );
};
