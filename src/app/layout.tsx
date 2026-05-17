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
    "The art universe of ruriroo._ — Egyptian artist and college student. Pencil portraits, watercolour studies, mixed media illustrations and whatever else felt right that day.",
  keywords: [
    "ruriroo",
    "Egyptian artist",
    "sketchbook art",
    "watercolor",
    "portrait illustration",
    "art portfolio",
    "Instagram art",
    "anime art",
    "mixed media",
    "digital art",
  ],
  authors: [{ name: "ruriroo._", url: "https://instagram.com/ruriroo._" }],
  openGraph: {
    title: "ruriroo._ — art & stuff",
    description: "Enter the art universe of ruriroo._ — Egyptian artist.",
    type: "website",
    images: [{ url: "/artwork/DToAJ0kiDsD/DToAJ0kiDsD_1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ruriroo._ — art & stuff",
    description: "Enter the art universe of ruriroo._ — Egyptian artist.",
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
