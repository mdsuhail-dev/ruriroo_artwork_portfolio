import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { EasterEgg } from "@/components/shared/EasterEgg";
import { PageTransition } from "@/components/shared/PageTransition";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ruriroo._ | art",
  description: "ruriroo._ — art. drawings. illustrations. @ruriroo._ on Instagram and TikTok.",
  keywords: [
    "ruriroo", "ruriroo._", "ruriroo art", "ruriroo drawings",
    "ruriroo instagram", "ruriroo tiktok", "@ruriroo._",
    "ruriroo portfolio", "ruriroo illustrations", "ruriroo sketchbook",
  ],
  authors: [{ name: "ruriroo._", url: "https://instagram.com/ruriroo._" }],
  metadataBase: new URL("https://ruriroo.vercel.app"),
  openGraph: {
    title: "ruriroo._",
    description: "art. nothing more.",
    url: "https://ruriroo.vercel.app",
    siteName: "ruriroo._",
    type: "website",
    images: [{ url: "/artwork/DToAJ0kiDsD/DToAJ0kiDsD_1.jpg", width: 1080, height: 1080, alt: "ruriroo._ art" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ruriroo._",
    description: "art. nothing more.",
    site: "@ruriroo_",
    creator: "@ruriroo_",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${cormorant.variable} ${dmSans.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>
          <LenisProvider />
          <GrainOverlay />
          <CustomCursor />
          <EasterEgg />
          <Navigation />
          <main className="relative"><PageTransition>{children}</PageTransition></main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
