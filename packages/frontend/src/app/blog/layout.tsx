"use client";

import { Flex } from "@/lib/radix";
import { NavigationButton } from "@/lib/resync-components/NavigationButton";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isOnBlogHome = pathName.endsWith("/blog");

  return (
    <Flex direction="column" flex="1">
      <Flex m="2">
        <Flex>
          <NavigationButton
            href={isOnBlogHome ? "/" : "/blog"}
            variant="outline"
          >
            {isOnBlogHome ? (
              <HomeIcon size={16} />
            ) : (
              <ArrowLeftIcon size={16} />
            )}
          </NavigationButton>
        </Flex>
      </Flex>
      <Flex direction="column" flex="1" maxHeight="100%" mx="auto" my="3">
        <Flex style={{ paddingBottom: "100px" }}>{children}</Flex>
      </Flex>
    </Flex>
  );
}
