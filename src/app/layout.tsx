import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

import type { PropsWithChildren } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obre",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${styles.body}`}
    >
      {children}
      <footer>
        <p>© {new Date().getFullYear()} Obre. All rights reserved.</p>
      </footer>
    </body>
  </html>
);

export default RootLayout;
