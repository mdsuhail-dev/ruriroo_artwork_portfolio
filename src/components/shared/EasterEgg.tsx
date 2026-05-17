"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Konami Code sequence
const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

// Stars that explode on activation
const STAR_BURST = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  angle: (i / 28) * 360,
  distance: 80 + Math.random() * 160,
  size: 8 + Math.random() * 16,
  color: ["#E8C87A", "#C85F88", "#7BA8D4", "#E879A0"][Math.floor(Math.random() * 4)],
  delay: Math.random() * 0.3,
}));

export function EasterEgg() {
  const [keys, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setActivated(true);
          setTimeout(() => setActivated(false), 5000);
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-void/90 backdrop-blur-sm" />

          {/* Star burst */}
          <div className="relative z-10 flex items-center justify-center">
            {STAR_BURST.map((star) => (
              <motion.div
                key={star.id}
                className="absolute"
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((star.angle * Math.PI) / 180) * star.distance,
                  y: Math.sin((star.angle * Math.PI) / 180) * star.distance,
                  scale: [0, 1.5, 1],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  delay: star.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <svg
                  width={star.size}
                  height={star.size}
                  viewBox="0 0 24 24"
                  fill={star.color}
                >
                  <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" />
                </svg>
              </motion.div>
            ))}

            {/* Centre message */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-8 py-8"
            >
              <div className="flex justify-center gap-3 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E8C87A">
                  <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" />
                </svg>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#C85F88">
                  <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E8C87A">
                  <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" />
                </svg>
              </div>
              <h2
                className="text-5xl md:text-7xl text-cream mb-3"
                style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
              >
                you found her secret
              </h2>
              <p
                className="text-rose text-xl"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                ✦ welcome to the inner circle ✦
              </p>
              <p className="mt-4 text-xs text-muted tracking-widest uppercase">
                try /lab for more
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
