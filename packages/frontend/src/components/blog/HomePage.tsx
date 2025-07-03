import { BlogLinks } from "@/components/blog/BlogLinks";
import { Flex, Tabs } from "@/lib/radix";
import { usePathname, useRouter } from "next/navigation";

export function HomePage() {
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = pathname.split("/")[2];

  const handleTabChange = (value: string) => {
    router.push(`/blog/${value}`);
  };

  return (
    <Flex align="center" gap="2">
      <Tabs.Root onValueChange={handleTabChange} value={currentCategory}>
        <Tabs.List>
          <Tabs.Trigger value="resync">Resync</Tabs.Trigger>
          <Tabs.Trigger value="engineering">Engineering</Tabs.Trigger>
          <Tabs.Trigger value="art">Art</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="resync">
          <BlogLinks category="resync" />
        </Tabs.Content>
        <Tabs.Content value="engineering">
          <BlogLinks category="engineering" />
        </Tabs.Content>
        <Tabs.Content value="art">
          <BlogLinks category="art" />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
