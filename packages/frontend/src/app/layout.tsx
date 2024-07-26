import type { Metadata } from "next";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Tiles tbd",
  description: "tbd"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>{children}</body>
    </html>
  );
}
