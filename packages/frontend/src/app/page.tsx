"use client";

import { JoinGame } from "@/components/joinGame/JoinGame";
import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";
import { Flex } from "@/lib/radix";
import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import { BookIcon } from "lucide-react";

export default function Home() {
  return (
    <Flex align="center" flex="1" justify="center">
      <Flex direction="column" gap="6">
        <ClientGate>
          <PlayerContextProvider>
            <Flex direction="column" gap="3">
              <JoinGame />
              <NavigationButton href="/games/create" variant="outline">
                Create new game
              </NavigationButton>
            </Flex>
          </PlayerContextProvider>
        </ClientGate>
        <NavigationButton href="/blog/resync" variant="ghost">
          <BookIcon size={16} />
          Blog
        </NavigationButton>
      </Flex>
    </Flex>
  );
}
