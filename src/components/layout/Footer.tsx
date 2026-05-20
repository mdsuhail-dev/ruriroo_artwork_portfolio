"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const SOCIALS = [
  { href: "https://instagram.com/ruriroo._", label: "Instagram", handle: "@ruriroo._" },
  { href: "https://tiktok.com/@ruriroo._", label: "TikTok", handle: "@ruriroo._" },
  { href: "https://pinterest.com/ruriroo", label: "Pinterest", handle: "ruriroo" },
  { href: "https://youtube.com/@ruriroo._", label: "YouTube", handle: "@ruriroo._" },
];

export function Footer() {
  return (
    <footer
      className="mt-16"
      style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" }}
    >
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: "var(--color-star)" }}>✦</span>
              <span style={{ fontFamily: "var(--font-caveat)", fontSize: "1.5rem", color: "var(--color-cream)" }}>
                ruriroo._
              </span>
            </div>
            <p className="label" style={{ color: "var(--color-muted)", letterSpacing: "0.15em" }}>
              art. nothing more.
            </p>
          </div>

          {/* Socials */}
          <div>
            <p className="label mb-5" style={{ color: "var(--color-faint)" }}>Find me</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex items-center justify-between py-2.5 px-0"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <span
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-rose"
                    style={{ color: "var(--color-cream)" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="label transition-colors duration-200 group-hover:text-rose"
                    style={{ color: "var(--color-faint)" }}
                  >
                    {s.handle} ↗
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p className="label" style={{ color: "var(--color-faint)" }}>
            © {new Date().getFullYear()} ruriroo._
          </p>
          <p className="label" style={{ color: "var(--color-faint)", opacity: 0.5 }}>
            Made by Suhail
          </p>
        </div>
      </div>
    </footer>
  );
}
