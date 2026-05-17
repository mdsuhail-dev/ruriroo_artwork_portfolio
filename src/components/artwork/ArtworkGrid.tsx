"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Artwork, categories, ArtworkCategory } from "@/data/artworks";
import { ArtworkCard } from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: Artwork[];
  showFilter?: boolean;
}

export function ArtworkGrid({ artworks, showFilter = true }: ArtworkGridProps) {
  const [activeCategory, setActiveCategory] = useState<ArtworkCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? artworks
      : artworks.filter((a) => a.category === activeCategory);

  return (
    <div>
      {/* Category Filter */}
      {showFilter && (
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 border ${
                activeCategory === cat.value
                  ? "bg-rose text-void border-rose"
                  : "bg-transparent text-muted border-border hover:border-rose/50 hover:text-cream"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      )}

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filtered.map((artwork, i) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={i}
              size="md"
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="font-display text-2xl text-muted italic">
            No works in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
