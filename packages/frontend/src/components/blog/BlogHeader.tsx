"use client";

import { BLOG_LINKS } from "@/components/blog/BlogLinks";
import { DisplayText, Flex } from "@/lib/radix";
import { usePathname, useRouter } from "next/navigation";

export const BlogHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const accordingEntry = BLOG_LINKS.find((link) => link.href === pathname);

  if (accordingEntry === undefined) {
    router.push("/blog");
    return;
  }

  return (
    <Flex direction="column" gap="2" mb="4">
      <DisplayText size="6" weight="bold">
        {accordingEntry.title}
      </DisplayText>
      <Flex>
        <DisplayText color="gray" size="2">
          {new Date(accordingEntry.date).toLocaleDateString()} by{" "}
          {accordingEntry.author}
        </DisplayText>
      </Flex>
    </Flex>
  );
};
