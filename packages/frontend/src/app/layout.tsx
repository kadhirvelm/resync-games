import clsx from "clsx";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import styles from "./layout.module.scss";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  description: "tbd",
  title: "Tiles tbd"
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
