import { Badge, DisplayText, Flex } from "@/lib/radix";
import { useRouter } from "next/navigation";
import styles from "./BlogLinks.module.scss";
import { capitalize } from "lodash-es";

export type BlogCategory = "resync" | "engineering" | "art";

interface BlogLink {
  author: string;
  category: BlogCategory;
  date: string;
  description: string;
  href: string;
  title: string;
}

export const BLOG_LINKS: BlogLink[] = [
  {
    author: "Kadhir",
    category: "resync",
    date: "2025-05-04",
    description:
      "Some thoughts on the goals we're trying to achieve with these games and some insight into our explorations.",
    href: "/blog/resync/what-is-this",
    title: "What is this?"
  }
];

export const BlogLinks = ({ category }: { category: BlogCategory }) => {
  const router = useRouter();
  const links = BLOG_LINKS.filter((link) => link.category === category);

  if (links.length === 0) {
    return (
      <Flex align="center" className={styles.noneContainer} m="4">
        <DisplayText color="gray" size="2">
          None
        </DisplayText>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="2" m="4">
      {links.map(({ author, date, description, href, title }) => (
        <Flex
          className={styles.container}
          direction="column"
          key={href}
          onClick={() => router.push(href)}
          p="3"
        >
          <Flex>
            <DisplayText size="3">{title}</DisplayText>
          </Flex>
          <Flex>
            <DisplayText color="gray" size="2">
              {description}
            </DisplayText>
          </Flex>
          <Flex gap="2" justify="between" mt="4">
            <Flex>
              <DisplayText color="gray" size="2">
                {new Date(date).toLocaleDateString()}
              </DisplayText>
            </Flex>
            <Flex>
              <Badge>{capitalize(author)}</Badge>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
