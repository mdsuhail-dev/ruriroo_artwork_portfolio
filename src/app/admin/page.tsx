"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ArtworkRecord {
  id: string;
  title: string;
  category: string;
  imageCount: number;
  featured: boolean;
  published: boolean;
  year: number;
  images: string[];
  createdAt: string;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-5 rounded-xl" style={{ background: "rgba(19,17,26,0.8)", border: "1px solid rgba(42,34,50,0.8)" }}>
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#A09490" }}>{label}</p>
      <p style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "2.5rem", color: "#F0EBE3", lineHeight: 1.1, marginTop: "0.25rem" }}>{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [artworks, setArtworks] = useState<ArtworkRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/artworks")
      .then((r) => r.json())
      .then((d) => { setArtworks(d.artworks || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  async function toggleFeatured(id: string, current: boolean) {
    await fetch("/api/admin/artworks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, featured: !current }),
    });
    setArtworks((prev) => prev.map((a) => a.id === id ? { ...a, featured: !current } : a));
  }

  async function togglePublished(id: string, current: boolean) {
    await fetch("/api/admin/artworks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, published: !current }),
    });
    setArtworks((prev) => prev.map((a) => a.id === id ? { ...a, published: !current } : a));
  }

  async function deleteArtwork(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/artworks?id=${id}`, { method: "DELETE" });
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  }

  const stats = {
    total: artworks.length,
    featured: artworks.filter((a) => a.featured).length,
    published: artworks.filter((a) => a.published).length,
    images: artworks.reduce((sum, a) => sum + a.imageCount, 0),
  };

  return (
    <div style={{ minHeight: "100vh", padding: "0" }}>
      {/* Top bar */}
      <header style={{ borderBottom: "1px solid rgba(42,34,50,0.8)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(11,9,16,0.95)", backdropFilter: "blur(20px)", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#E8C87A" }}>✦</span>
          <span style={{ fontFamily: "var(--font-caveat, cursive)", fontSize: "1.3rem", color: "#F0EBE3" }}>ruriroo._ Studio</span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link href="/" target="_blank" style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09490", textDecoration: "none" }}>View Site ↗</Link>
          <button onClick={logout} style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C85F88", background: "none", border: "none", cursor: "pointer" }}>Logout</button>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F0EBE3", fontWeight: 300, lineHeight: 1.1 }}>
            Welcome back, <span style={{ fontStyle: "italic", color: "#C85F88" }}>ruriroo._</span>
          </h1>
          <p style={{ color: "#A09490", marginTop: "0.5rem", fontSize: "0.9rem" }}>Manage your universe from here.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          <Stat label="Total Works" value={stats.total} />
          <Stat label="Featured" value={stats.featured} />
          <Stat label="Published" value={stats.published} />
          <Stat label="Total Images" value={stats.images} />
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <Link href="/admin/upload" style={{ padding: "0.875rem 1.5rem", background: "#C85F88", color: "#0B0910", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            ✦ Upload New Work
          </Link>
          <Link href="/admin/manage" style={{ padding: "0.875rem 1.5rem", background: "rgba(19,17,26,0.8)", border: "1px solid rgba(42,34,50,0.9)", color: "#F0EBE3", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
            Manage Gallery
          </Link>
        </motion.div>

        {/* Recent uploads */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#A09490", marginBottom: "1rem" }}>Recent Uploads</p>

          {loading ? (
            <p style={{ color: "#A09490", fontSize: "0.9rem" }}>Loading...</p>
          ) : artworks.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", border: "1px dashed rgba(42,34,50,0.8)", borderRadius: "12px" }}>
              <p style={{ color: "#A09490", marginBottom: "1rem" }}>No artworks yet.</p>
              <Link href="/admin/upload" style={{ color: "#C85F88", fontSize: "0.85rem" }}>Upload your first piece →</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {artworks.slice(0, 10).map((artwork, i) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "rgba(19,17,26,0.6)", border: "1px solid rgba(42,34,50,0.6)", borderRadius: "12px" }}
                >
                  {/* Thumbnail */}
                  {artwork.images[0] && (
                    <div style={{ width: "52px", height: "52px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "rgba(42,34,50,0.5)" }}>
                      <img src={artwork.images[0]} alt={artwork.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "1.1rem", color: "#F0EBE3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{artwork.title}</p>
                    <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09490", marginTop: "0.1rem" }}>{artwork.category} · {artwork.imageCount} img · {artwork.year}</p>
                  </div>

                  {/* Toggles */}
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button onClick={() => toggleFeatured(artwork.id, artwork.featured)} title="Toggle featured" style={{ padding: "0.35rem 0.6rem", borderRadius: "6px", border: "1px solid rgba(42,34,50,0.8)", background: artwork.featured ? "rgba(232,200,122,0.15)" : "transparent", color: artwork.featured ? "#E8C87A" : "#A09490", fontSize: "0.75rem", cursor: "pointer" }}>
                      ✦
                    </button>
                    <button onClick={() => togglePublished(artwork.id, artwork.published)} title="Toggle published" style={{ padding: "0.35rem 0.6rem", borderRadius: "6px", border: "1px solid rgba(42,34,50,0.8)", background: artwork.published ? "rgba(200,95,136,0.15)" : "transparent", color: artwork.published ? "#C85F88" : "#A09490", fontSize: "0.7rem", cursor: "pointer" }}>
                      {artwork.published ? "Live" : "Draft"}
                    </button>
                    <Link href={`/admin/edit/${artwork.id}`} style={{ padding: "0.35rem 0.6rem", borderRadius: "6px", border: "1px solid rgba(42,34,50,0.8)", color: "#A09490", fontSize: "0.7rem", textDecoration: "none" }}>Edit</Link>
                    <button onClick={() => deleteArtwork(artwork.id, artwork.title)} title="Delete" style={{ padding: "0.35rem 0.6rem", borderRadius: "6px", border: "1px solid rgba(200,95,136,0.2)", color: "#C85F88", background: "transparent", fontSize: "0.7rem", cursor: "pointer" }}>✕</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
