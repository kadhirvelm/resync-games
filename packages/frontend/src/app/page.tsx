"use client";

import { JoinGame } from "@/components/joinGame/JoinGame";
import { PlayerContextProvider } from "@/components/player/PlayerContext";
import { ClientGate } from "@/lib/ClientGate";
import { DisplayText, Flex } from "@/lib/radix";
import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import Image from "next/image";
import { BookIcon } from "lucide-react";
import { EnvironmentContextProvider } from "../context/Environment";

export default function Home() {
  return (
    <Flex align="center" flex="1" justify="center">
      <Flex direction="column" gap="6">
        <ClientGate>
          <EnvironmentContextProvider>
            <PlayerContextProvider>
              <Flex direction="column" gap="3">
                <Flex align="center" justify="center" mb="4">
                  <Image
                    alt="Resync logo"
                    height={50}
                    src="/resync-games.png"
                    width={50}
                  />
                  <DisplayText size="6" weight="bold">
                    Resync games
                  </DisplayText>
                </Flex>
                <JoinGame />
                <NavigationButton href="/games/create" variant="outline">
                  Create new game
                </NavigationButton>
              </Flex>
            </PlayerContextProvider>
          </EnvironmentContextProvider>
        </ClientGate>
        <NavigationButton href="/blog/resync" variant="ghost">
          <BookIcon size={16} />
          Blog
        </NavigationButton>
      </Flex>
    </Flex>
  );
}
