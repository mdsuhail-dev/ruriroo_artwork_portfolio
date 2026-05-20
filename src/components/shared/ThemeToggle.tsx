"use client";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-muted)",
      }}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: "1rem", lineHeight: 1 }}
      >
        {isDark ? "☀︎" : "☽"}
      </motion.span>
    </motion.button>
  );
}
