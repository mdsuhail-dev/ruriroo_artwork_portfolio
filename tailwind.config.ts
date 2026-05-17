import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables so dark/light theme works with Tailwind classes
        void:    "var(--color-void)",
        surface: "var(--color-surface)",
        surface2:"var(--color-surface2)",
        border:  "var(--color-border)",
        rose:    "var(--color-rose)",
        "rose-bright": "var(--color-rose-bright)",
        cobalt:  "var(--color-blue)",
        amber:   "var(--color-amber)",
        cream:   "var(--color-cream)",
        muted:   "var(--color-muted)",
        faint:   "var(--color-faint)",
        star:    "var(--color-star)",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body:    ["DM Sans", "system-ui", "sans-serif"],
        hand:    ["Caveat", "cursive"],
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float":      "float 5s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        "glow-rose":    "0 0 40px rgba(200, 95, 136, 0.4)",
        "glow-rose-lg": "0 0 70px rgba(200, 95, 136, 0.5)",
        "glow-star":    "0 0 20px rgba(232, 200, 122, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
