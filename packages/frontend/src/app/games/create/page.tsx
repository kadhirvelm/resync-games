"use client";

import { Flex } from "@/lib/radix/Flex";
import { Text } from "@radix-ui/themes";
import { NavigationButton } from "@/lib/tiles-components/NavigationButton";
import dynamic from "next/dynamic";
import styles from "./page.module.scss";

export default function NavigateToGameCreate() {
  // Lazy load the game component only on the client-side
  const DynamicComponent = dynamic(
    () =>
      import("@resync-games/games").then((module) => {
        const { GAME_REGISTRY } = module;
        return () => (
          <Flex direction="column" gap="2">
            {Object.entries(GAME_REGISTRY).map(([slug, { name }]) => (
              <NavigationButton
                href={`/${slug}`}
                key={slug}
                style={{ padding: "5px" }}
              >
                {name}
              </NavigationButton>
            ))}
          </Flex>
        );
      }),
    { ssr: false } // Disable server-side rendering
  );

  return (
    <Flex className={styles.formBoxContainer} direction="column" gap="2">
      <Flex className={styles.formBox} direction="column" gap="5">
        <Text>Pick game to create</Text>
        <DynamicComponent />
      </Flex>
    </Flex>
  );
}
