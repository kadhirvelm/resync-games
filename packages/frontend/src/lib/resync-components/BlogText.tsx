import { DisplayText } from "@/lib/radix";
import styles from "./BlogText.module.scss";

export const BlogText = ({ children }: { children: React.ReactNode }) => {
  return (
    <DisplayText className={styles.blogText}>
      <p>{children}</p>
    </DisplayText>
  );
};

export const PlainBlogText = ({ children }: { children: React.ReactNode }) => {
  return <DisplayText className={styles.blogText}>{children}</DisplayText>;
};
