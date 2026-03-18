import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

import type { PropsWithChildren } from "react";

const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Obre",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="fr">
    <body className={`${crimsonPro.variable} ${styles.body}`}>{children}</body>
  </html>
);

export default RootLayout;
