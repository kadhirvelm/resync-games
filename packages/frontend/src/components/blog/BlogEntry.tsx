import { BlogHeader } from "@/components/blog/BlogHeader";
import { DisplayText, Flex } from "@/lib/radix";
import styles from "./BlogEntry.module.scss";
import Link from "next/link";

export const BlogEntry = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex className={styles.content} direction="column">
      <BlogHeader />
      <Flex className={styles.dividerLine} flex="1" />
      {children}
      <Flex direction="column" gap="2" mt="4">
        <Flex gap="1">
          <DisplayText color="gray" size="2">
            <Link href="/blog">See more blog posts</Link>
          </DisplayText>
        </Flex>
        <Flex gap="1">
          <DisplayText color="gray" size="2">
            <Link href="/">Checkout our games</Link>
          </DisplayText>
        </Flex>
      </Flex>
    </Flex>
  );
};
