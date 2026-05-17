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
  title: "ruriroo._ — art & stuff",
  description:
    "The official portfolio of ruriroo._ — Egyptian artist and college student. Pencil portraits, watercolour, mixed media illustrations. Follow on Instagram, TikTok, YouTube and Pinterest @ruriroo._",
  keywords: [
    "ruriroo",
    "ruriroo._",
    "ruriroo art",
    "ruriroo artist",
    "ruriroo portfolio",
    "ruriroo instagram",
    "ruriroo tiktok",
    "ruriroo youtube",
    "ruriroo pinterest",
    "@ruriroo._",
    "Egyptian artist",
    "Egyptian art",
    "Egyptian illustrator",
    "pencil portrait art",
    "sketchbook art",
    "watercolor illustration",
    "mixed media art",
    "art portfolio",
    "college artist",
    "female artist",
    "portrait illustration",
  ],
  authors: [{ name: "ruriroo._", url: "https://instagram.com/ruriroo._" }],
  creator: "ruriroo._",
  metadataBase: new URL("https://ruriroo.vercel.app"),
  alternates: {
    canonical: "https://ruriroo.vercel.app",
  },
  openGraph: {
    title: "ruriroo._ — art & stuff",
    description: "The official portfolio of ruriroo._ — Egyptian artist. Pencil, watercolour, mixed media.",
    url: "https://ruriroo.vercel.app",
    siteName: "ruriroo._",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ruriroo._ — art & stuff",
    description: "The official portfolio of ruriroo._ — Egyptian artist.",
    creator: "@ruriroo._",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },


  openGraph: {
    title: "ruriroo._ — art & stuff",
    description: "The official portfolio of ruriroo._ — Egyptian artist. Pencil, watercolour, mixed media.",
    url: "https://ruriroo.vercel.app",
    siteName: "ruriroo._",
    locale: "en_US",
    type: "website",
    images: [{ url: "/artwork/DToAJ0kiDsD/DToAJ0kiDsD_1.jpg", width: 1080, height: 1080, alt: "ruriroo._ art" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ruriroo._ — art & stuff",
    description: "The official portfolio of ruriroo._ — Egyptian artist.",
    creator: "@ruriroo._",
  },
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
      <body className="bg-void text-cream antialiased">
        <LenisProvider />
        <GrainOverlay />
        <CustomCursor />
        <EasterEgg />
        <Navigation />
        <main className="relative"><PageTransition>{children}</PageTransition></main>
        <Footer />
      </body>
    </html>
  );
}
