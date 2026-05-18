import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { SITE_CONFIG } from "@/lib/config";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.brandName} — ${SITE_CONFIG.brandTagline}`,
    template: `%s · ${SITE_CONFIG.brandName}`
  },
  description: `Vehicle-specific carbon fiber upgrades, hand-laid and autoclave-cured.`
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <ParallaxBackground />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
