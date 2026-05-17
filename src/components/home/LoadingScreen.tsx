"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if this is a repeat visit in this session — skip loader
    if (sessionStorage.getItem("ruriroo_loaded")) {
      setVisible(false);
      onComplete();
      return;
    }
    const t1 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("ruriroo_loaded", "1");
    }, 1400);
    const t2 = setTimeout(() => onComplete(), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeIn" }}
          className="fixed inset-0 z-[9998] bg-void flex flex-col items-center justify-center"
        >
          {/* Signature draw */}
          <svg
            viewBox="0 0 420 80"
            className="w-56 md:w-72 h-auto mb-4"
            aria-label="ruriroo._"
          >
            <motion.text
              x="50%"
              y="62"
              textAnchor="middle"
              fontFamily="'Caveat', cursive"
              fontSize="64"
              fontWeight="500"
              fill="none"
              stroke="#F0EBE3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              ruriroo._
            </motion.text>
            <motion.text
              x="50%"
              y="62"
              textAnchor="middle"
              fontFamily="'Caveat', cursive"
              fontSize="64"
              fontWeight="500"
              fill="#F0EBE3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
            >
              ruriroo._
            </motion.text>
          </svg>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            {[0, 0.08, 0.16].map((delay, i) => (
              <motion.svg
                key={i}
                width={i === 1 ? 16 : 10}
                height={i === 1 ? 16 : 10}
                viewBox="0 0 24 24"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 + delay, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <path
                  d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z"
                  fill={i === 1 ? "#E8C87A" : "#C85F88"}
                />
              </motion.svg>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
