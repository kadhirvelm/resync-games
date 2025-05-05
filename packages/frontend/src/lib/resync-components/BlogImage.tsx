import { PlainBlogText } from "@/lib/resync-components/BlogText";
import Image from "next/image";

export const BlogImage = ({ href }: { href: string }) => {
  return (
    <PlainBlogText>
      <Image
        alt={href}
        height={1} // Aspect ratio height
        layout="responsive"
        objectFit="contain" // or 'cover' depending on your needs
        src={href}
        width={1} // Aspect ratio width
      />
      <br />
    </PlainBlogText>
  );
};
