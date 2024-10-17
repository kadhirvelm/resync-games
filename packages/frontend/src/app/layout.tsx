import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  description: "Games that bring people together",
  title: "Resync games"
};

const font = Dosis({
  subsets: ["latin"],
  weight: "400"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(styles.body, font.className)}>
        <Theme className={styles.entryPoint} hasBackground={false}>
          {children}
        </Theme>
      </body>
    </html>
  );
}
