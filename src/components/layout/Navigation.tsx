"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

// 4 socials only — no X/Twitter
const SOCIALS = [
  { href: "https://instagram.com/ruriroo._", label: "Instagram" },
  { href: "https://tiktok.com/@ruriroo._", label: "TikTok" },
  { href: "https://pinterest.com/ruriroo", label: "Pinterest" },
  { href: "https://youtube.com/@ruriroo._", label: "YouTube" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/universe", label: "Work" },
  { href: "/feed", label: "Feed" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Social strip — very top ──────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60]"
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0.5rem 0",
        }}
      >
        <div className="container-site flex items-center justify-center gap-5 md:gap-8">
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label hover:text-rose transition-colors duration-200"
              style={{ color: "var(--color-muted)", minHeight: "auto" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main navbar ─────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed left-0 right-0 z-50"
        style={{
          top: "33px", // sits right below social strip
          padding: scrolled ? "0.65rem 0" : "0.9rem 0",
          background: scrolled ? "var(--color-void)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "padding 0.3s ease, background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span style={{ color: "var(--color-star)", fontSize: "0.8rem" }}>✦</span>
            <span
              style={{
                fontFamily: "var(--font-caveat)",
                fontSize: "1.4rem",
                color: "var(--color-cream)",
              }}
              className="group-hover:text-rose transition-colors duration-300"
            >
              ruriroo._
            </span>
          </Link>

          {/* Right side: nav + theme toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-5">
              {NAV_LINKS.filter(l => l.href !== '/').map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="label transition-colors duration-200 hover:text-cream relative"
                  style={{ color: pathname === link.href ? "var(--color-cream)" : "var(--color-muted)" }}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px" style={{ background: "var(--color-rose)" }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ minHeight: "auto" }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
                className="block h-px origin-center"
                style={{ background: "var(--color-cream)" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-px"
                style={{ background: "var(--color-cream)", width: "14px", marginLeft: "3px" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
                className="block h-px origin-center"
                style={{ background: "var(--color-cream)" }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "var(--color-void)" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "3.5rem",
                    color: "var(--color-cream)",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Socials in mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mt-4"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label hover:text-rose transition-colors duration-200"
                  style={{ color: "var(--color-muted)" }}
                >
                  {s.label} ↗
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
