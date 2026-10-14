import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Quanter",
  description:
    "Independent quantitative research on behavioral signals and regime-aware risk. Research and paper trading only.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
