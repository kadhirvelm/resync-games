"use client";

import { BlogHeader } from "@/components/blog/BlogHeader";
import { DisplayText, Flex } from "@/lib/radix";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import styles from "./BlogEntry.module.scss";
import { useEffect } from "react";

interface TwitterWindow {
  twttr: { widgets: { load: () => void } };
}

export const BlogEntry = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentCategory = pathname.split("/")[2];

  useEffect(() => {
    (window as unknown as TwitterWindow).twttr?.widgets.load();
  }, []);

  return (
    <Flex className={styles.content} direction="column">
      <BlogHeader />
      <Flex className={styles.dividerLine} flex="1" />
      {children}
      <Flex direction="column" gap="2" mt="4">
        <Flex gap="1">
          <a
            className="twitter-follow-button"
            data-show-count="false"
            href="https://twitter.com/kadhir_velm"
            target="_blank"
          >
            Follow @kadhir_velm
          </a>
          <Script
            onLoad={() => {
              (window as unknown as TwitterWindow).twttr?.widgets.load();
            }}
            src="https://platform.twitter.com/widgets.js"
            strategy="afterInteractive"
          />
        </Flex>
        <Flex gap="1">
          <DisplayText color="gray" size="2">
            <Link href={`/blog/${currentCategory}`}>See more blog posts</Link>
          </DisplayText>
        </Flex>
      </Flex>
    </Flex>
  );
};
