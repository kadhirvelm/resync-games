import type { Metadata } from "next";
import styles from "./layout.module.scss";
import { Dosis } from "next/font/google";
import clsx from "clsx";
import { Grommet } from "grommet";

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
        <Grommet plain>{children}</Grommet>
      </body>
    </html>
  );
}
