"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/universe", label: "Universe" },
  { href: "/about", label: "About" },
  { href: "/archive", label: "Archive" },
];

const socialLinks = [
  { href: "https://instagram.com/ruriroo._", label: "Instagram" },
  { href: "https://tiktok.com/@ruriroo._", label: "TikTok" },
  { href: "https://www.youtube.com/@ruriroo", label: "YouTube" },
  { href: "https://in.pinterest.com/ruriroo/", label: "Pinterest" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-surface/30">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="star text-star">✦</span>
              <span className="font-hand text-2xl text-cream">ruriroo._</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Egyptian artist & college student. I don&apos;t even know what my artstyle
              is — so enjoy the gallery.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label mb-4">Navigate</p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted hover:text-cream transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="label mb-4">Find me everywhere</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-rose transition-colors duration-300 flex items-center gap-1.5"
                >
                  {link.label}
                  <span className="text-xs opacity-60">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <p className="label text-faint">
            © {new Date().getFullYear()} ruriroo._ — all rights reserved.
          </p>
          <p className="label text-faint text-xs tracking-widest uppercase">
            RURIROO-artist
          </p>
        </div>
      </div>
    </footer>
  );
}
