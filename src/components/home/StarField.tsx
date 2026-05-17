"use client";
import { FloatingStar } from "@/components/shared/StarSparkle";

const STARS = [
  { x: "8%", y: "15%", size: 8, delay: 0 },
  { x: "18%", y: "60%", size: 14, delay: 1.2 },
  { x: "35%", y: "25%", size: 6, delay: 0.7 },
  { x: "48%", y: "80%", size: 10, delay: 2.1 },
  { x: "55%", y: "10%", size: 12, delay: 0.4 },
  { x: "67%", y: "45%", size: 7, delay: 1.8 },
  { x: "78%", y: "70%", size: 16, delay: 0.9 },
  { x: "88%", y: "20%", size: 9, delay: 1.5 },
  { x: "92%", y: "55%", size: 5, delay: 2.5 },
  { x: "25%", y: "88%", size: 11, delay: 0.3 },
  { x: "72%", y: "8%", size: 7, delay: 1.1 },
  { x: "42%", y: "50%", size: 8, delay: 3.0 },
];

export function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {STARS.map((s, i) => (
        <FloatingStar
          key={i}
          x={s.x}
          y={s.y}
          size={s.size}
          delay={s.delay}
          color={i % 3 === 0 ? "#E8C87A" : i % 3 === 1 ? "#C85F88" : "#7BA8D4"}
        />
      ))}
    </div>
  );
}
