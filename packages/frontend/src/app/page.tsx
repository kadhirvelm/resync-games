"use client";

import { AvailableGames } from "@/components/connectToGame/AvailableGames";
import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";
import { Flex } from "@/lib/radix";
import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import styles from "./page.module.scss";
import { BookIcon } from "lucide-react";

export default function Home() {
  return (
    <Flex flex="1">
      <Flex className={styles.blog}>
        <NavigationButton href="/blog" variant="outline">
          <BookIcon size={16} />
          Blog
        </NavigationButton>
      </Flex>
      <ClientGate>
        <PlayerContextProvider>
          <AvailableGames />
        </PlayerContextProvider>
      </ClientGate>
    </Flex>
  );
}
