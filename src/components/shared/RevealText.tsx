"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "words" | "chars" | "lines";
}

export function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "p",
  splitBy = "words",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const parts = splitBy === "words" ? children.split(" ") : children.split("");

  return (
    <Tag
      ref={ref as any}
      className={`overflow-visible ${className}`}
      aria-label={children}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: splitBy === "words" ? "0.25em" : undefined }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.04,
            }}
          >
            {part}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
