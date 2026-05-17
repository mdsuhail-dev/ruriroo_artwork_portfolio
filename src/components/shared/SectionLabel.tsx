"use client";
import { motion } from "framer-motion";

interface SectionLabelProps {
  children: string;
  className?: string;
  withStar?: boolean;
  delay?: number;
}

export function SectionLabel({
  children,
  className = "",
  withStar = true,
  delay = 0,
}: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true }}
      className={`flex items-center gap-2 ${className}`}
    >
      {withStar && (
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="#C85F88"
          className="flex-shrink-0"
        >
          <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" />
        </svg>
      )}
      <span className="label">{children}</span>
    </motion.div>
  );
}
