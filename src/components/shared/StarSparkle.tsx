"use client";
import { motion } from "framer-motion";
import { useId } from "react";

interface StarSparkleProps {
  size?: number;
  className?: string;
  delay?: number;
  color?: string;
}

export function StarSparkle({
  size = 16,
  className = "",
  delay = 0,
  color = "#E8C87A",
}: StarSparkleProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block ${className}`}
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{ opacity: [0, 1, 0.7], scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
        repeat: Infinity,
        repeatDelay: 3 + delay,
      }}
    >
      {/* 4-pointed star — her signature motif */}
      <path
        d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z"
        fill={color}
        opacity="0.9"
      />
    </motion.svg>
  );
}

export function FloatingStar({
  x,
  y,
  size = 12,
  delay = 0,
  color = "#E8C87A",
}: {
  x: string;
  y: string;
  size?: number;
  delay?: number;
  color?: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -8, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 4 + delay,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z"
          fill={color}
        />
      </svg>
    </motion.div>
  );
}
