"use client";

import { Flex } from "@/lib/radix";
import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import { HomeIcon } from "lucide-react";

export default function Blog() {
  return (
    <Flex direction="column" m="4">
      <Flex align="center" gap="2">
        <NavigationButton href="/">
          <HomeIcon size={16} />
        </NavigationButton>
        Under construction. Please check back later.
      </Flex>
    </Flex>
  );
}
