"use client";
import { useState } from "react";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { QuoteSection } from "@/components/home/QuoteSection";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <HeroSection />
          <FeaturedGrid />
          <QuoteSection />
        </>
      )}
    </>
  );
}
