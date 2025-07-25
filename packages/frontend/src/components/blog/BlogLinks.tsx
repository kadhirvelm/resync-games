import { DisplayText, Flex } from "@/lib/radix";
import { useRouter } from "next/navigation";
import styles from "./BlogLinks.module.scss";

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
    date: "05/04/2025, 12:00 PM",
    description:
      "Some thoughts on the goals we're trying to achieve with these games and some insight into our explorations.",
    href: "/blog/resync/what-is-this",
    title: "What is this?"
  },
  {
    author: "Kadhir",
    category: "resync",
    date: "05/04/2025, 7:00 PM",
    description: "Initial thoughts on what we think we've found so far.",
    href: "/blog/resync/what-have-we-learned",
    title: "What have we learned?"
  },
  {
    author: "Kadhir",
    category: "art",
    date: "10/01/2019, 12:00 PM",
    description: "Where all of these art pieces came from.",
    href: "/blog/art/background",
    title: "Background"
  },
  {
    author: "Kadhir",
    category: "art",
    date: "08/01/2020, 12:00 PM",
    description: "A king's message to his people.",
    href: "/blog/art/royalty",
    title: "Royalty - To my loyal kingdom"
  },
  {
    author: "Kadhir",
    category: "art",
    date: "05/01/2021, 12:00 PM",
    description: "A group of lemons come to visit.",
    href: "/blog/art/when-life-gives-you-lemons",
    title: "When life gives you lemons"
  },
  {
    author: "Kadhir",
    category: "art",
    date: "03/01/2021, 12:00 PM",
    description: "The robots saved us.",
    href: "/blog/art/a-blank-in-disguise",
    title: "A ___ in disguise"
  },
  {
    author: "Kadhir",
    category: "engineering",
    date: "05/09/2025, 5:00 PM",
    description:
      "The positive effects of a monorepo on engineering team culture.",
    href: "/blog/engineering/monorepo-culture",
    title: "The monorepo culture"
  },
  {
    author: "Kadhir",
    category: "engineering",
    date: "06/12/2025, 10:00 AM",
    description:
      "Some thoughts on the causes of toxic engineering teams and what to do about it.",
    href: "/blog/engineering/toxic-teams",
    title: "Toxic teams"
  },
  {
    author: "Kadhir",
    category: "engineering",
    date: "07/02/2025, 7:00 PM",
    description:
      "Thoughts on a world where we transition from LLMs as assistants to compilers.",
    href: "/blog/engineering/llms-as-compiler",
    title: "LLMs as compilers"
  }
];

export const BlogLinks = ({ category }: { category: BlogCategory }) => {
  const router = useRouter();
  const links = BLOG_LINKS.filter((link) => link.category === category)
    .slice()
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

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
      {links.map(({ date, description, href, title }) => (
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
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
