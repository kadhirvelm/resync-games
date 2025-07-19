import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Dosis } from "next/font/google";
import styles from "./layout.module.scss";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: "device-width"
};

export const metadata: Metadata = {
  description: "Games that bring people together",
  title: "Resync games",
  viewport: viewport
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
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(styles.body, font.className)}>
        <Theme className={styles.entryPoint} hasBackground={false}>
          <ToastContainer />
          {children}
          <Analytics />
          <SpeedInsights />
        </Theme>
      </body>
    </html>
  );
}
